<template>
  <div class="art-list">
    <ul>
      <li v-for="art in arts" :key="art.id">
        <router-link :to="'/posts/' + art.id + '/' + art.title" class="title">
          {{ art.title }}
        </router-link>
        <div class="control">
          <span class="edit iconfont icon-edit"></span>
          <span class="del iconfont icon-el-icon-delete"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arts: [
        {
          id: 1,
          title: '文章标题',
          pub_time: '2020-09-09'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
