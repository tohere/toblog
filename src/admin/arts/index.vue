<template>
  <!-- 文章列表 -->
  <div class="art">
    <div class="search flex-center">
      <div class="search-box">
        <input type="search" class="search" placeholder="请输入搜索内容" />
      </div>
      <button class="btn">搜索</button>
      <button class="btn primary">写文章</button>
    </div>
    <div class="arts">
      <art-list :articles="articles"></art-list>
    </div>
    <Pagination
      @changePage="changePage"
      :pageSize="pageSize"
      :total="total"
    ></Pagination>
  </div>
</template>

<script>
import ArtList from './artList'
import Pagination from '@/components/common/pagination'

import artMixin from '@/mixin/artMixin'

export default {
  name: 'Arts',
  mixins: [artMixin],
  components: {
    ArtList,
    Pagination,
  },
  data() {
    return {
      pageSize: 10,
    }
  },
  created() {
    this.getPageArticles(1, this.pageSize)
    this.getNums()
  },
  methods: {
    /**
     * 点击页码跳转
     */
    changePage(item) {
      this.getPageArticles(item, this.pageSize)
    },
  },
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
    &.primary {
      background-color: rgb(12, 161, 12);
    }
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
.arts {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
