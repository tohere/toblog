<template>
  <!-- 首页页面 -->
  <div id="home" ref='home' v-show="articles.length > 0">
    <article-info
      v-for="(info, index) in articles"
      :key="index"
      :articleInfo="info"
    >
      <div slot="articleTitle">
        <article-title :articleInfo="info"></article-title>
      </div>
    </article-info>
    <Pagination
        :total="total"
        :pageSize="pageSize"
        @changePage="changePage"
        class="flex-center"
      ></Pagination>
  </div>
</template>

<script>
import ArticleInfo from '@/components/home/articleInfo'
import articleTitle from '@/components//common/articleTitle'
import Pagination from '@/components/common/pagination'
// import { getArticles, getArtsNum } from '@/api'
import artMixin from '@/mixin/artMixin'
export default {
  name: 'Home',
  mixins: [artMixin],
  components: {
    ArticleInfo,
    Pagination,
    articleTitle,
  },
  data() {
    return {
      // 文章信息
      // articles: [],
      // total: 0, // 文章总数
      pageSize: 5, // 每页显示文章数
      el: null
    }
  },
  created() {
    this.getPageArticles(1, this.pageSize)
    this.getNums()
  },
  methods: {
    /**
     * 获取分页文章详情
     * page: 页码，默认为1
     * pageSize: 每页显示条数，默认为5
     */
    // async getPageArticles(page = 1, pageSize = 5) {
    //   getArticles({
    //     params: {
    //       page,
    //       pageSize,
    //     },
    //   }).then((res) => {
    //     if (res.status === 1) {
    //       if (res.data.length > 0) {
    //         this.articles = res.data
    //       }
    //     } else {
    //       throw Error(res.err)
    //     }
    //   })
    // },
    /**
     * 获取文章总数
     */
    // getNums() {
    //   getArtsNum().then((res) => {
    //     if (res.status === 0) {
    //       throw Error(res.err)
    //     }
    //     this.total = res.total[0].total
    //   })
    // },
    /**
     * 点击页码跳转
     */
    changePage(item) {
      this.getPageArticles(item, this.pageSize)
      this.$refs.home.parentElement.scrollTop = 0
    },
  },
}
</script>

<style lang="less" scoped>
</style>
