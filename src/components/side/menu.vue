<template>
  <!-- menu组件 -->
  <ul class="menu">
    <router-link tag="li" :to='menu.link'
      v-for="(menu, index) in menus"
      :key="index"
      :class="{ active: $route.path === menu.link }"
    >
      <div>
        <i class="iconfont" :class="'icon-' + menu.icon"></i>
        <span>{{ menu.name }}</span>
      </div>
      <span class="nums" v-if="menu.num">30</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'menus',
  data () {
    return {
      // menus: [
      //   { icon: 'home', name: '首页', link: '/' },
      //   { icon: 'biaoqian', name: '标签', link: '/' },
      //   { icon: 'fenlei', name: '分类', link: '/' },
      //   { icon: 'guidang', name: '归档', link: '/' },
      //   { icon: 'yonghu', name: '关于', link: '/' },
      //   { icon: 'search', name: '搜索', link: '/' }
      // ]
    }
  },
  computed: {
    menus () {
      return this.$store.state.menus
    }
  }
}
</script>

<style lang='less' scoped>
.menu {
  background-color: #fff;
  padding: 20px 0;
  font-size: 13px;
  color: @menu-txt-color;
  list-style: none;
  margin: 0;
  li {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &.active {
      background-color: @menu-bg-active;
    }
    &:hover {
      background-color: @menu-bg-active;
    }
    .nums {
      padding: 0 5px;
      border-radius: 8px;
      font-weight: blod;
      color: @num-txt;
      font-size: 12px;
      background-color: @num-bg;
      line-height: 16px;
      height: 16px;
    }
  }
  .iconfont {
    font-size: 13px;
    margin-right: 8px;
  }
}
</style>