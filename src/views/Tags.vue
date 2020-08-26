<template>
  <!-- 标签页面 -->
  <div id="tags">
    <div  v-show="$route.path === '/tags'">
      <h1 class="page-title">标签</h1>
      <p>目前共计 {{ tags.length }} 个标签</p>
      <ul>
        <router-link
          tag="li"
          :to="{ path: '/tags/' + tag.id + '/' + tag.title }"
          v-for="tag in tags"
          :key="tag.id"
          >{{ tag.title }}</router-link
        >
      </ul>
    </div>
    <div v-show="$route.path !== '/tags'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import tagMixin from '@/mixin/tagMixin'

export default {
  name: 'Tags',
  mixins: [tagMixin]
}
</script>

<style lang="less" scoped>
#tags {
  padding: 40px;
}
p {
  text-align: center;
  font-size: 18px;
  line-height: 40px;
  color: #666;
}
ul {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
}
li {
  padding: 5px;
  list-style: none;
  color: #333;
  opacity: 0.5;
  transition-duration: 0.2;
  cursor: pointer;
  border-bottom: 1px solid #333;
  margin: 10px;
  &:hover {
    opacity: 1;
  }
}
</style>
