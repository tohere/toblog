<template>
  <!-- 标签页面 -->
  <div id="tags">
    <h1 class="page-title">标签</h1>
    <p>目前共计 {{ tags.length }} 个标签</p>
    <ul>
      <router-link tag="li" :to="{path: '/tags/' + tag.name}" v-for="tag in tags" :key="tag.id">{{ tag.name }}</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  data () {
    return {
      tags: [
        { id: 1, name: 'js' },
        { id: 2, name: 'vue' },
        { id: 3, name: 'nodenodenodenode' }
      ]
    }
  }
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
  opacity: .5;
  transition-duration: .2;
  cursor: pointer;
  border-bottom: 1px solid #333;
  margin: 10px;
  &:hover {
    opacity: 1;
  }
}
</style>
