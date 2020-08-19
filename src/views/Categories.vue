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
import { getCates } from '@/api'
export default {
  name: 'Categories',
  components: {
    Cate
  },
  data() {
    return {
      cates: [
        // {
        //   id: 1,
        //   name: '菜单',
        //   articleNums: 3,
        // },
        // {
        //   id: 2,
        //   name: 'hexo',
        //   articleNums: 3,
        // },
      ]
    }
  },
  created() {
    this.getAllCates()
  },
  methods: {
    getAllCates() {
      getCates().then((res) => {
        if (res.status === 1) {
          this.cates = res.cates
        } else {
          throw Error(res.err)
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
#cates {
  padding: 20px;
}
</style>
