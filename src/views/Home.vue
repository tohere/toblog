<template>
  <!-- 首页页面 -->
  <div id="home">
    <article-info v-for="(articleInfo, index) in articleInfos" :key="index" :articleInfo='articleInfo'></article-info>
    <Pagination :total='total'></Pagination>
  </div>
</template>

<script>
import ArticleInfo from '@/components/home/articleInfo'
import Pagination from '@/components/home/pagination'
export default {
  name: 'Home',
  components: {
    ArticleInfo,
    Pagination
  },
  data () {
    return {
      // 文章信息
      articleInfos: [
        {
          isTop: false,
          title: '文章标题',
          publishTime: '2020-07-19 23:24:25',
          updateTime: '2020-07-19 23:24:25',
          categories: ['javascript', 'nodejs'],
          articleWords: '2.5k',
          readTime: '8分钟',
          abstract: ''
        },
        {
          isTop: false,
          title: '文章标题',
          publishTime: '2020-07-19 23:24:25',
          updateTime: '2020-07-19 23:24:25',
          categories: ['javascript', 'nodejs'],
          articleWords: '2.5k',
          readTime: '8分钟',
          abstract: ''
        }
      ],
      total: 123 // 文章总数
    }
  }
}
</script>

<style lang="less" scoped>

</style>
