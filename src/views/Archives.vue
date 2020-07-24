<template>
  <!-- 归档页面 -->
  <div class="archives">
    <Archive></Archive>
    <Pagination :total='total' class="pagination"></Pagination>

  </div>
</template>

<script>
import Archive from '@/components/archives/archive'
import Pagination from '@/components/common/pagination'

export default {
  name: 'Archives',
  components: {
    Archive,
    Pagination
  },
  data () {
    return {
      total: 200
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 80px;
}
</style>
