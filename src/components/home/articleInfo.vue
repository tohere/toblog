<template>
  <!-- home页面中的文章信息组件 -->
  <div class="article-info">
    <slot name="articleTitle"></slot>
    <div class="abstract">
      {{ desc }}
    </div>
    <div class="read-full" @click="readAll">阅读全文<i class="iconfont icon-shuangyou"></i></div>
    <div class="hr"></div>
  </div>
</template>

<script>
import { strFilter } from '../../libs/strFilter'
export default {
  name: 'articleInfo',
  props: {
    articleInfo: {
      type: Object,
      default() {
        return {
        }
      },
    },
  },
  data() {
    return {
      // articleInfo: {
      //   isTop: false,
      //   title: '文章标题',
      //   publishTime: '2020-07-19 23:24:25',
      //   updateTime: '2020-07-19 23:24:25',
      //   categories: ['javascript', 'nodejs'],
      //   articleWords: '2.5k',
      //   readTime: '8分钟',
      //   abstract: ''
      // }
    }
  },
  computed: {
    desc () {
      const ctx = strFilter(this.articleInfo.content)
      // 截取文章前200个字符当做摘要
      return ctx.substr(0, 200) + '...'
    }
  },
  methods: {
    readAll () {
      this.$router.push({
        path: '/posts/'+ this.articleInfo.id + '/' + this.articleInfo.title
      })
    }
  }
}
</script>

<style lang="less" scoped>
.article-info {
  .abstract {
    padding: 60px 20px 40px;
    line-height: 30px;
    font-size: 14px;
    color: #666;
  }
  .read-full {
    width: 120px;
    line-height: 30px;
    text-align: center;
    margin: 0 auto;
    color: #666;
    border: 2px solid #333;
    cursor: pointer;
    background-color: #fff;
    border-radius: 6px;
    .iconfont {
      font-size: 12px;
    }
    &:hover {
      background-color: #333;
      color: #fff;
    }
  }
  .hr {
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin: 40px 0;
  }
}
</style>
