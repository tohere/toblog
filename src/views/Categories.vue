<template>
  <!-- 分类页面 -->
  <div id="cates">
    <div v-show="$route.path === '/categories'">
      <h1 class="page-title">分类</h1>
      <Cate :cates="cates" v-if="cates.length > 0"></Cate>
    </div>
    <div v-show="$route.path !== '/categories'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Cate from '@/components/categories/cate'

import cateMixin from '@/mixin/cateMixin'

export default {
  name: 'Categories',
  mixins: [cateMixin],
  components: {
    Cate
  },
  created() {
    this.getAllCates()
  },
}
</script>

<style lang="less" scoped>
#cates {
  padding: 20px;
}
</style>
