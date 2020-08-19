<template>
  <!-- 分类归档组件页面 -->
  <div class="cate-arch">
    <Arch :archives="cateArts.archives" :total="cateArts.total"></Arch>
    <Pagination @changePage='changePage' :total="cateArts.total"></Pagination>
  </div>
</template>

<script>
import Arch from '@/components/archives/archive'
import Pagination from '@/components/common/pagination'
import { getArtsByCateId } from '@/api'
export default {
  name: 'Categories',
  components: {
    Arch,
    Pagination,
  },
  data() {
    return {
      cateArts: {
        total: 0,
        archives: [],
      },
      page: 1,
      pageSize: 10,
      cateId: 0,
      cate: ''
    }
  },
  created() {
    this.cateId = this.$route.params.id
    this.getArchs()
  },
  methods: {
    // 通过分类id获取该分类下的文章
    getArchs () {
      getArtsByCateId({
          id: this.cateId,
          page: this.page,
          pageSize: this.pageSize
        }).then(res => {
        if (res.status === 1) {
          const arts = res.arts
          const years = res.years
          let arr = []
          years.forEach(year => {
            let articles = []
            arts.forEach(art => {
              if (year.year === art.year) {
                articles.push(art)
              }
            })
            arr.push({
              year: year.year,
              articles
            })
          })
          this.cateArts = {
            total: res.total,
            archives: arr
          }
        }
      })
    },
    /**
     * 点击页码跳转获取对应页面数据
     */
    changePage (page) {
      this.page = page
      this.getArchs()
    }
  },
}
</script>

<style lang="less" scoped>
</style>
