<template>
  <!-- Pagination分页组件 -->
  <ul class="pagination" v-if="pages.length > 1">
    <li
      class="iconfont icon-left"
      :class="{ disable: !(nowPage > 1) }"
      @click="prev"
    ></li>
    <li
      v-for="(item, index) in pages"
      :key="index"
      :class="{ active: item === nowPage }"
      @click="changeNowPage(item)"
    >
      {{ item }}
    </li>
    <li
      class="iconfont icon-right"
      :class="{ disable: !(nowPage < pageTotal) }"
      @click="next"
    ></li>
  </ul>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    // 每页显示文章数，默认10篇
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总条目数，默认0
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 当前激活的页码，默认为1
      nowPage: 1,
    }
  },
  computed: {
    // 总页数
    pageTotal() {
      return Math.ceil(parseInt(this.total) / this.pageSize)
    },
    /**
     * 总的分页数组
     * 总页数<=10的时候全部显示
     * 当前页<5时, 右边显示 ... 和 最后页码
     * 当前页>总页数-5时, 左边显示 1 和 ...
     * 当前页处于中间状态时, 左边显示 1 和 ... 中间显示7个页码  右边显示 ... 和最后页码
     */
    pages() {
      let pages = this.pageTotal
      let cur = this.nowPage
      if (pages <= 10) {
        let arr = []
        for (let i = 1; i <= pages; i++) {
          arr.push(i)
        }
        return arr
      }
      if (cur < 5) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, '...', pages]
      }
      if (cur > pages - 5) {
        return [
          1,
          '...',
          pages - 8,
          pages - 7,
          pages - 6,
          pages - 5,
          pages - 4,
          pages - 3,
          pages - 2,
          pages - 1,
          pages,
        ]
      }
      return [
        1,
        '...',
        cur - 3,
        cur - 2,
        cur - 1,
        cur,
        cur + 1,
        cur + 2,
        cur + 3,
        '...',
        pages,
      ]
    },
  },
  methods: {
    // 切换页面
    changeNowPage(item) {
      if (item === '...' || item === this.nowPage) return
      this.nowPage = item
      this.$emit('changePage', item)
    },
    // 上一页
    prev() {
      if (this.nowPage <= 1) return
      this.$emit('changePage', this.nowPage--)
    },
    // 下一页
    next() {
      if (this.nowPage >= this.pageTotal) return
      this.$emit('changePage', this.nowPage++)
    },
  },
}
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  display: flex;
  li {
    width: 30px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 2px;
    background-color: #f4f4f4;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    &.icon-left {
      font-size: 14px;
    }
    &.disable {
      color: #ccc;
    }
    &.dot {
      line-height: 22px;
      cursor: default;
    }
    &.active {
      background-color: blue;
    }
  }
}
</style>
