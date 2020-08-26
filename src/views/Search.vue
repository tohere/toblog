<template>
  <!-- 搜索页面 -->
  <div class="search">
    <h1>搜索一下</h1>
    <div class="search-box">
      <input v-model="word" @keyup.enter="search" type="search" placeholder="请输入搜索关键词" />
      <Button type="primary" @click="search">搜索</Button>
    </div>
    <ul class="list">
      <router-link :to="'/posts/' + art.id + '/' + art.title" tag="li" v-for="art in arts" :key="art.id">
        <span class="title">{{ art.title }}</span>
        <div class="pub-time">{{ art.pub_time | dateFilter }}</div>
      </router-link>
    </ul>
    <Pagination
      @changePage="changePage"
      :pageSize="pageSize"
      :total="total"
    ></Pagination>
  </div>
</template>

<script>
import Button from '@/components/common/Button'
import Pagination from '@/components/common/pagination'

import { searchByWord } from '@/api/get'

import { dateFormat } from '@/libs/dateFormat'

export default {
  name: 'Search',
  components: {
    Button,
    Pagination
  },
  data () {
    return {
      pageSize: 10,
      page: 1,
      total: 0,
      word: '',
      arts: []
    }
  },
  filters: {
    // 时间过滤器
    dateFilter (date) {
      return dateFormat(date)
    }
  },
  methods: {
    /**
     * 根据关键词搜索文章
     */
    search () {
      if (!this.word) {
        this.$toast.show({
          text: '请输入搜索关键词！',
          type: 'error'
        })
        return
      } 
      searchByWord(this.word, this.page, this.pageSize).then(res => {
        if (res.status === 1) {
          this.total = res.total
          this.arts = res.data
        } else {
          throw Error('搜索出错')
        }
      })
    },
    changePage () { }
  }
}
</script>

<style lang="less" scoped>
.search {
  h1 {
    text-align: center;
    line-height: 100px;
  }
  .search-box {
    display: flex;
    input {
      width: 100%;
      margin-right: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      outline: none;
      text-indent: 10px;
      color: #333;
      font-size: 14px;
    }
    button {
      flex-shrink: 0;
    }
  }
  .list {
    padding-left: 0;
    list-style: none;
    li {
      width: 100%;
      background-color: #eee;
      border-radius: 5px;
      margin-bottom: 10px;
      padding: 0 20px;
      font-size: 14px;
      cursor: pointer;
      line-height: 30px;
      padding: 10px 20px;
      .title {
        font-weight: bold;
      }
      .pub-time {
        font-size: 13px;
        color: #666;
      }
      &:hover {
        background-color: #e2e2e2;
      }
    }
  }
}
</style>
