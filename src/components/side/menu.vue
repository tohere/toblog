<template>
  <!-- menu组件 -->
  <div class="menu-box">
    <span class="iconfont icon-menu hidden-md-and-up icon-menu-btn" @click="menuShow = !menuShow"></span>
    <ul class="menu" :class="{hide: !menuShow}">
      <router-link
        tag="li"
        :to="menu.link"
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
  </div>
</template>

<script>
export default {
  name: "menus",
  data() {
    return {
      menuShow: true
      // menus: [
      //   { icon: 'home', name: '首页', link: '/' },
      //   { icon: 'biaoqian', name: '标签', link: '/' },
      //   { icon: 'fenlei', name: '分类', link: '/' },
      //   { icon: 'guidang', name: '归档', link: '/' },
      //   { icon: 'yonghu', name: '关于', link: '/' },
      //   { icon: 'search', name: '搜索', link: '/' }
      // ]
    };
  },
  mounted() {
    // 监听窗口变化，控制菜单初始显示隐藏
    this.menuShow = document.body.clientWidth >= 991;
    window.onresize = () => {
      this.menuShow = document.body.clientWidth >= 991;
      console.log(this.menuShow);
    };
  },
  computed: {
    menus() {
      return this.$store.state.menus;
    }
  }
};
</script>

<style lang='less' scoped>
.menu-box {
  position: relative;
  .icon-menu-btn {
    position: absolute;
    top: -80px;
    left: 15px;
    color: #fff;
    font-size: 25px;
    cursor: pointer;
    padding: 3px 10px;
    border: 1px solid #fff;
    border-radius: 5px;
  }
}
.menu {
  background-color: #fff;
  padding: 20px 0;
  font-size: 13px;
  color: @menu-txt-color;
  list-style: none;
  margin: 0;
  transition-duration: .2s;
  &.hide {
    padding: 0;
    height: 0;
    overflow: hidden;
  }
  li {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
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
// .slide-height-enter-active, .slide-height-leave-active {
//   height: 0;
//   transition: all .5s;
// }
// .slide-height-enter, .slide-height-leave-to {
//   height: 100%;
// }
// .slide-height-enter-to, .slide-height-leave {
//   height: 0;
// }
</style>