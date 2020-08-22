<template>
  <!-- 文章详情页面 -->
  <div id="posts" ref="posts">
    <article-title :articleInfo="art"></article-title>
    <mavon-editor
      class="mark-pre"
      defaultOpen="preview"
      :toolbarsFlag="false"
      :subfield="false"
      v-model="art.content"
      codeStyle="atom-one-dark"
      :editable="false"
      :ishljs="true"
      v-if="art.title"
    ></mavon-editor>
  </div>
</template>

<script>
import ArticleTitle from '@/components/common/articleTitle'
import { getArtById } from '../api/get'
export default {
  name: 'Posts',
  components: {
    ArticleTitle
  },
  data() {
    return {
      art: {
        // isTop: false,
        // title: '文章标题',
        // publishTime: '2020-07-19 23:24:25',
        // updateTime: '2020-07-19 23:24:25',
        // categories: ['javascript', 'nodejs'],
        // articleWords: '2.5k',
        // readTime: '8分钟',
        // abstract: '',
      },
    }
  },
  created() {
    this.getArt()
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.posts.parentElement.scrollTop = 0 // 再次进入内容页的时候返回最顶部，不知道什么情况，不设置的话会出现主页和内容页共用一个滚动位置的情况
    })
  },
  methods: {
    // 通过文章id请求文章详情
    async getArt() {
      const id = this.$route.params.id
      const art = await getArtById(id)
      if (art.status === 1) {
        this.art = art.data[0]
      } else {
        throw Error(art.err)
      }
    }
  },
}
</script>

<style lang="less" scoped>
#posts {
  position: relative;
}
.mark-pre {
  margin-top: 60px;
}
.to-top {
  position: fixed;
  bottom: 150px;
  right: 80px;
  background-color: #666;
  width: 50px;
  height: 50px;
  z-index: 999;
  color: #fff;
  cursor: pointer;
}
@media only screen and (max-width: 767px) {
  .to-top {
    display: none;
  }
}
</style>
