<template>
  <!-- 写文章页面 -->
  <div class="write">
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
      <button @click="publish">发布</button>
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

import {
  upImg,
  addArt,
  addArtCate,
  addArtTag,
  addCate,
  addTag,
} from '@/api/post'
import { delImg } from '@/api/delete'
export default {
  name: 'Write',
  mixins: [cateMixin, tagMixin],
  components: {
    ArtMask,
  },
  data() {
    return {
      title: '',
      content: '',
      show: false, // 控制发布弹窗显示隐藏
      flag: true, // 控制自动保存启动
    }
  },
  created() {
    this.getAllCates('all', 'admin')
    this.getAllTags('admin')
    let art = localStorage.getItem('art')
    if (art) {
      art = JSON.parse(art)
      // if (art.type === 'write') {
      this.title = art.title
      this.content = art.content
      // }
    }
  },
  methods: {
    // 图片上传事件
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      upImg(formdata).then((url) => {
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
    // 文章发布
    publish() {
      if (!this.title) {
        this.$toast.show({
          text: '请输入文章标题！',
          type: 'error',
        })
        return
      }
      this.show = true
    },
    confirm() {
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
      addArt(this.title, this.content)
        .then((res) => {
          this.show = false
          if (res.status === 1) {
            this.$toast.show({
              text: '文章发布成功！',
              type: 'success',
            })
            // 返回的插入文章后的文章id
            const artId = res.data.insertId
            /* eslint-disable */
            addArtCate(artId, cates).then((res) => {
              // console.log(res)
            })
            addArtTag(artId, tags).then((res) => {
              // console.log(res)
            })
            this.$router.replace('/admin')
            setTimeout(() => {
              localStorage.removeItem('art')
            }, 1100);
          } else {
            this.$toast.show({
              text: '文章发布失败！',
              type: 'error',
            })
          }
        })
        .catch((err) => {
          this.$toast.show({
            text: '文章插入失败！',
            type: 'error',
          })
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
  },
  watch: {
    content() {
      if (this.flag) {
        this.flag = false
        setTimeout(() => {
          const art = JSON.stringify({
            title: this.title,
            content: this.content,
            type: 'write'
          })
          localStorage.setItem('art', art)
          this.flag = true
        }, 1000)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.write {
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
