<template>
  <!-- 文章列表 -->
  <div class="art">
    <div class="search flex-center">
      <div class="search-box">
        <input type="search" class="search" placeholder="请输入搜索内容">
      </div>
      <button class="btn">搜索</button>
    </div>
    <div class="arts">
      <art-list></art-list>
    </div>
  </div>
</template>

<script>
import ArtList from './artList'
export default {
  name: 'Arts',
  components: {
    ArtList
  }
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 80px;
  .btn {
    width: 80px;
    height: 40px;
    line-height: 40px;
    background-color: #2681e9;
    color: #fff;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 10px;
    flex-shrink: 0;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
  }
  .search-box {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #2681e9;
    min-width: 100px;
  }
  .search {
    height: 40px;
    line-height: 40px;
    border: none;
    outline: none;
    font-size: 14px;
    text-indent: 10px;
  }
}
</style>
