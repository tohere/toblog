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
        :subfield="false"
        v-model="content"
        codeStyle="atom-one-dark"
        :ishljs="true"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
      ></mavon-editor>
    </div>
    <div class="pub">
      <button>发布</button>
    </div>
  </div>
</template>

<script>
import { upImg } from '@/api/post'
import { delImg } from '@/api/delete'
export default {
  name: 'Write',
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
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
    $imgDel (ev) {
      const file = ev[0].split('/')
      const filename = file[file.length - 1]
      delImg(filename).then(res => {
        if (res.status === 1) {

        } else {
          throw Error(res.err)
        }
      }).catch(err => {
        throw Error(err)
      })
    }
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
