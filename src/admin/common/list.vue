<template>
  <ul class="list">
    <li v-for="list in lists" :key="list.id">
      <div class="inner">
        <span class="title" :title="list.title">{{ list.title }} <i v-if="$route.path === '/admin/cates'">({{list.num}})</i></span>
        <span class="del iconfont icon-el-icon-delete" @click="del(list.id)"></span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    del (id) {
      this.$emit('delete', id)
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  list-style: none;
  display: flex;
  padding-left: 0;
  flex-wrap: wrap;
  width: 100%;
  li {
    width: 50%;
    background-color: #fff;
    padding: 5px;
    .inner {
      display: flex;
      justify-content: space-between;
      color: blue;
      height: 40px;
      line-height: 40px;
      background-color: #eee;
      padding: 0 10px 0 20px;
      border-radius: 5px;
      font-size: 14px;
    }
    .title {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      i {
        font-style: normal;
        font-size: 12px;
      }
    }
    .del {
      color: #f00;
      cursor: pointer;
      width: 40px;
      text-align: center;
      flex-shrink: 0;
    }
  }
}
</style>
