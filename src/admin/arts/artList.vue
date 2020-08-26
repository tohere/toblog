<template>
  <div class="art-list">
    <ul>
      <li v-for="art in articles" :key="art.id">
        <div class="art-info">
          <router-link :to="'/posts/' + art.id + '/' + art.title" class="title" :title="art.title">
            {{ art.title }}
          </router-link>
          <div class="pub-time">发布时间: {{ art.pub_time | dateFilter }}</div>
        </div>
        <div class="control" :class="{'rec' : $route.path === '/admin/recycle'}">
          <span v-show="art.istop && $route.path === '/admin'" class="top" @click="optTop(art, 0)">取消置顶</span>
          <span v-show="!art.istop && $route.path === '/admin'"  class="top" @click="optTop(art, 1)">置顶</span>
          <span v-show="$route.path === '/admin'" class="edit iconfont icon-edit" @click="edit(art)"></span>
          <span v-show="$route.path === '/admin'" class="del iconfont icon-el-icon-delete" @click="setArtShow(art.id, 0)"></span>
          <span v-show="$route.path === '/admin/recycle'" class="recycle iconfont icon-huanyuan" @click="setArtShow(art.id, 1)"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { dateFormat } from '@/libs/dateFormat'

export default {
  props: ['articles'],
  data () {
    return {
      // arts: [
      //   {
      //     id: 1,
      //     title: '文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题',
      //     pub_time: '2020-09-09'
      //   },
      //   {
      //     id: 2,
      //     title: '文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题',
      //     pub_time: '2020-09-09'
      //   }
      // ]
    }
  },
  filters: {
    // 时间过滤器
    dateFilter (date) {
      return dateFormat(date)
    }
  },
  methods: {
    optTop (art, top) {
      this.$emit('optTop', {
        id: art.id,
        top
      })
    },
    setArtShow (artId, show) {
      this.$emit('setArtShow', {
        id: artId,
        show
      })
    },
    /**
     * 文章编辑
     */
    edit (art) {
      this.$router.push({
        name: 'Edit',
        params: {
          id: art.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.art-list {
  width: 100%;
  height: 100%;
}
ul {
  list-style: none;
  padding-left: 0;
  width: 100%;
  li {
    width: 100%;
    background-color: #eee;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    border-radius: 5px;
    .art-info {
      flex: 1;
      font-size: 12px;
      height: 40px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      .pub-time {
        line-height: 26px;
        color: #666;
      }
      a {
        color: #333;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .title {
      padding-right: 20px;
      text-decoration: none;
      font-size: 13px;
      line-height: 20px;
    }
    .control {
      font-size: 12px;
      width: 120px;
      flex-shrink: 0;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.rec {
        width: 40px;
        justify-content: center;
      }
      span {
        padding: 5px;
        cursor: pointer;
      }
      .del {
        color: #f00;
      }
      .recycle {
        color: green;
      }
      .top {
        width: 60px;
        text-align: center;
        color: #00f;
      }
    }
  }
}
</style>
