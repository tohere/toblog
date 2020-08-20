<template>
  <div class="art-list">
    <ul>
      <li v-for="art in articles" :key="art.id">
        <div class="art-info">
          <router-link :to="'/posts/' + art.id + '/' + art.title" class="title" :title="art.title">
            {{ art.title }}
          </router-link>
          <div class="pub-time">发布时间: 2020-09-12</div>
        </div>
        <div class="control">
          <span v-show="false" class="top">置顶</span>
          <span class="top">取消置顶</span>
          <span class="edit iconfont icon-edit"></span>
          <span class="del iconfont icon-el-icon-delete"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
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
      span {
        padding: 5px;
        cursor: pointer;
      }
      .del {
        color: #f00;
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
