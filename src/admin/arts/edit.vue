<template>
  <!-- 文章编辑页面 -->
  <div class="edit-art">
    <div class="title">
      <span>文章标题 : </span>
      <input type="text" placeholder="请输入文章标题" v-model="title" />
    </div>
    <div class="edit">
      <mavon-editor
        ref="med"
        class="mark-pre"
        :subfield="true"
        v-model="content"
        codeStyle="atom-one-dark"
        :ishljs="true"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
      ></mavon-editor>
    </div>
    <div class="pub">
      <button @click="update">更新</button>
    </div>
    <art-mask
      :show="show"
      :tags="tags"
      :cates="cates"
      @add="add"
      @cancel="cancel"
      @confirm="confirm"
      @select="select"
    ></art-mask>
  </div>
</template>

<script>
import cateMixin from '@/mixin/cateMixin'
import tagMixin from '@/mixin/tagMixin'

import ArtMask from './artMask'

import { getArtById, getTagIds, getCateIds } from '@/api/get'
import { upImg, addCate, addTag, addArtCate, addArtTag } from '@/api/post'
import { delImg, delCateIds, delTagIds } from '@/api/delete'

export default {
  name: 'Edit',
  mixins: [cateMixin, tagMixin],
  components: {
    ArtMask,
  },
  data() {
    return {
      title: '',
      content: '',
      show: false, // 控制发布弹窗显示隐藏
      artId: 0,
      flag: true,
    }
  },
  created() {
    this.artId = this.$route.params.id
    let art = localStorage.getItem('editArt' + this.artId)
    if (art) {
      art = JSON.parse(art)
      this.title = art.title
      this.content = art.content
    } else {
      this.getArt('admin')
    }
    this.getAllCates('all', 'admin')
    this.getAllTags('admin')
    this.getTagsId()
    this.getCatesId()
  },
  methods: {
    /**
     * 根据文章id获取数据
     */
    getArt() {
      const id = Number(this.$route.params.id)
      if (!id) return
      getArtById(id, 'admin')
        .then((res) => {
          if (res.status === 1) {
            const data = res.data[0]
            this.title = data.title
            this.content = data.content
          } else {
            throw Error(res.err)
          }
        })
        .catch((err) => {
          throw Error(err)
        })
    },
    /**
     * 根据文章id获取关键词ids
     */
    getTagsId() {
      getTagIds(this.artId, 'admin')
        .then((res) => {
          this.tags.forEach((tag) => {
            res.data.forEach((item) => {
              if (tag.id === item.tagId) {
                this.$set(tag, 'active', true)
              }
            })
          })
          /* eslint-disable-next-line */
        })
        .catch(() => {
          throw Error('获取关键词ids失败')
        })
    },
    /**
     * 根据文章id获取分类ids
     */
    getCatesId() {
      /* eslint-disable-next-line */
      getCateIds(this.artId, 'admin')
        .then((res) => {
          this.cates.forEach((cate) => {
            res.data.forEach((item) => {
              if (cate.id === item.cateId) {
                this.$set(cate, 'active', true)
              }
            })
          })
          /* eslint-disable-next-line */
        })
        .catch(() => {
          throw Error('获取分类ids失败')
        })
    },
    cancel() {
      this.show = false
    },
    add(type, title) {
      if (type === 'cate') {
        addCate(title).then((res) => {
          this.cates.unshift({
            id: res.data.insertId,
            title,
            active: true,
          })
        })
      } else {
        addTag(title).then((res) => {
          this.tags.unshift({
            id: res.data.insertId,
            title,
            active: true,
          })
        })
      }
    },
    select(cate) {
      this.$set(cate, 'active', !cate.active)
    },
    // 图片上传事件
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      upImg('/files/upload', formdata).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.med.$img2Url(pos, url.url)
      })
    },
    /* eslint-disable */
    // 图片删除事件
    $imgDel(ev) {
      const file = ev[0].split('/')
      const filename = file[file.length - 1]
      delImg(filename)
        .then((res) => {
          if (res.status === 1) {
          } else {
            throw Error(res.err)
          }
        })
        .catch((err) => {
          throw Error(err)
        })
    },
    async confirm() {
      const cates = this.cates.filter((cate) => cate.active)
      const tags = this.tags.filter((tag) => tag.active)

      if (!cates.length) {
        this.$toast.show({
          text: '请选择文章分类！',
          type: 'error',
        })
        return
      }
      if (!tags.length) {
        this.$toast.show({
          text: '请选择文章关键词！',
          type: 'error',
        })
        return
      }
      const delCate = await delCateIds(this.artId)
      const delTag = await delTagIds(this.artId)
      if (delCate.status === 1 && delTag.status === 1) {
        const addCate = await addArtCate(this.artId, cates)
        const addTag = await addArtTag(this.artId, tags)
        this.$toast.show({
          text: '更新成功！',
          type: 'success',
        })
        this.$router.replace('/admin')
        setTimeout(() => {
          localStorage.removeItem('editArt' + this.artId)
        }, 1100);
      } else {
        this.$toast.show({
          text: '更新出错！',
          type: 'error',
        })
        this.show = false
      }
    },
    update() {
      if (!this.title) {
        this.$toast.show({
          text: '请输入文章标题！',
          type: 'error',
        })
        return
      }
      this.show = true
    },
  },
  watch: {
    content() {
      if (this.flag) {
        this.flag = false
        setTimeout(() => {
          const art = JSON.stringify({
            title: this.title,
            content: this.content,
            type: 'edit',
            id: this.artId,
          })
          localStorage.setItem('editArt' + this.artId, art)
          this.flag = true
        }, 1000)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.edit-art {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 6px;
    height: 0px;
    background-color: #ebe7e7;
    border-radius: 6px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: #0ec7fe;
    border-radius: 6px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .title {
    width: 100%;
    height: 80px;
    padding: 22px 0;
    display: flex;
    align-items: center;
    span {
      width: 80px;
      font-size: 14px;
      font-weight: bold;
      flex-shrink: 0;
    }
    input {
      height: 100%;
      width: 100%;
      font-size: 13px;
      // border: 1px solid red;
      border: none;
      border-bottom: 2px solid #000;
      outline: none;
      font-weight: bold;
      text-align: center;
    }
  }
  .edit {
    position: relative;
    width: 100%;
    height: 100%;
  }
  /deep/ .v-note-wrapper {
    width: 100%;
    height: 100%;
  }
}
.pub {
  position: relative;
  width: 100%;
  bottom: -10px;
  height: 40px;
  flex-shrink: 0;
  text-align: center;
  button {
    width: 160px;
    height: 40px;
    background-color: #62ad3c;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 5px;
  }
}
@media only screen and (max-width: 991px) {
  .write {
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    -ms-overflow-style: none; /* IE 10+ */
  }
}
</style>
