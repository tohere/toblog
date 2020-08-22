<template>
  <!-- 文章列表 -->
  <div class="art">
    <div class="search flex-center">
      <div class="search-box">
        <input
          type="search"
          @keyup.enter="search"
          v-model="word"
          class="search"
          placeholder="请输入搜索内容"
        />
      </div>
      <button class="btn" @click="search">搜索</button>
      <router-link tag="button" to='/admin/write' class="btn primary">写文章</router-link>
    </div>
    <div class="arts">
      <art-list
        :articles="articles"
        @optTop="top"
        @setArtShow="delArt"
      ></art-list>
    </div>
    <Pagination
      @changePage="changePage"
      :pageSize="pageSize"
      :total="total"
    ></Pagination>
    <Dialog
      @close="close"
      :show="showDialog"
      title="确定删除该文章吗?"
      remind="警告"
    ></Dialog>
  </div>
</template>
<script>
/* eslint-disable */
import ArtList from './artList'
import Pagination from '@/components/common/pagination'
import Dialog from '@/components/common/dialog'

import { optTop, setArtShow } from '@/api/put'

import artMixin from '@/mixin/artMixin'

export default {
  name: 'Arts',
  mixins: [artMixin],
  components: {
    ArtList,
    Pagination,
    Dialog,
  },
  data() {
    return {
      pageSize: 10,
      page: 1,
      showDialog: false,
      delObj: {},
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
    /**
     * 取消置顶
     */
    top(param) {
      optTop(param.id, param.top)
        .then((res) => {
          if (res.status === 1) {
            this.getPageArticles(1, this.pageSize)
          } else {
            throw Error(res.err)
          }
        })
        .catch((err) => {
          throw Error(err)
        })
    },
    /**
     * 软删除文章
     */

    delArt(param) {
      this.showDialog = true
      this.delObj = param
    },
    close(param) {
      if (param === 'confirm') {
        setArtShow(this.delObj.id, this.delObj.show)
          .then((res) => {
            if (res.status === 1) {
              this.getPageArticles(1, this.pageSize)
              this.getNums()
            } else {
              throw Error(res.err)
            }
          })
          .catch((err) => {
            throw Error(err)
          })
      }
      this.showDialog = false
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
