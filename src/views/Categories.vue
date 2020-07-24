<template>
  <!-- 分类页面 -->
  <div id="cates">
    <h1 class="page-title">分类</h1>
    <Cate :cates="cates"></Cate>
  </div>
</template>

<script>
import Cate from '@/components/categories/cate'
export default {
  name: 'Categories',
  components: {
    Cate,
  },
  data() {
    return {
      cates: [
        {
          id: 1,
          name: '菜单',
          articleNums: 3,
          link: 'hexo',
          cates: [
            {
              id: 1,
              name: 'css',
              link: 'hexo/css',
              articleNums: 1,
              cates: [
                {
                  id: 1,
                  name: 'css',
                  link: 'hexo/css',
                  articleNums: 1
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'hexo',
          articleNums: 3,
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
#cates {
  padding: 20px;
}
</style>
