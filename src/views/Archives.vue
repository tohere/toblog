<template>
  <!-- 归档页面 -->
  <div class="archives">
    <Archive :archives="archives" :total="total"></Archive>
    <Pagination @changePage='changePage' :total="total" class="pagination"></Pagination>
  </div>
</template>

<script>
import Archive from '@/components/archives/archive'
import Pagination from '@/components/common/pagination'
import { getArchs } from '@/api/get'

export default {
  name: 'Archives',
  components: {
    Archive,
    Pagination,
  },
  data() {
    return {
      total: 0,
      archives: [],
      pageSize: 10,
      page: 1
    }
  },
  created() {
    this.getArchByPage()
  },
  methods: {
    // 获取归档数据
    getArchByPage() {
      getArchs({
        params: {
          page: this.page,
          pageSize: this.pageSize,
        },
      })
        .then((res) => {
          if (res.status === 1) {
            const years = res.data.years
            const archs = res.data.archs
            this.total = res.data.total
            let arr = []
            years.forEach((year) => {
              let articles = []
              archs.forEach((arch) => {
                if (year.y === arch.publishY) {
                  articles.push(arch)
                }
              })
              arr.push({
                year: year.y,
                articles,
              })
            })
            this.archives = arr
            console.log(arr)
          } else {
            throw Error(res.err)
          }
        })
        .catch((err) => {
          throw Error(err)
        })
    },
    changePage (page) {
      this.page = page
      this.getArchByPage(page)
    }
  },
}
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 80px;
}
</style>
