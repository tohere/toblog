<template>
  <!-- menu组件 -->
  <div class="menu-box">
    <span
      class="iconfont icon-menu hidden-md-and-up icon-menu-btn"
      @click="menuShow = !menuShow"
    ></span>
    <ul class="menu" :class="{ hide: !menuShow }">
      <li
        v-for="(menu, index) in menus"
        :key="index"
        :class="{ active: currentIndex === menu.id }"
        @click="menuClick(menu)"
      >
        <div>
          <i class="iconfont" :class="'icon-' + menu.icon"></i>
          <span>{{ menu.title }}</span>
        </div>
        <span v-if="menu.nums" class="nums">{{ menu.nums }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
// arch
// cate
// tag
export default {
  names: 'menus',
  props: ['menus'],
  data() {
    return {
      menuShow: true,
      // menus: [
      //   { id: 1, icon: 'home', title: '首页', link: '/', name: 'home' },
      //   { id: 2, icon: 'biaoqian', title: '标签', link: '/tags', name: 'tag' },
      //   { id: 3, icon: 'fenlei', title: '分类', link: '/categories', name: 'cate' },
      //   { id: 4, icon: 'guidang', title: '归档', link: '/archives', name: 'arch' },
      //   { id: 5, icon: 'yonghu', title: '关于', link: '/about', name: 'about' },
      //   { id: 6, icon: 'search', title: '搜索', link: '/search', name: 'search' },
      // ],
      bw: 0, // 记录body的宽度
      currentIndex: 1,
    }
  },
  created () {
    this.menus.forEach((item) => {
      if (this.$route.fullPath.indexOf(item.link) !== -1) {
        this.currentIndex = item.id
      }
    })
  },
  mounted() {
    // 监听窗口变化，控制菜单初始显示隐藏
    this.bw = document.body.clientWidth
    this.menuShow = this.bw > 991
    window.onresize = () => {
      setTimeout(() => {
        let bodyW = document.body.clientWidth
        if (bodyW > 991) {
          this.menuShow = true
          this.bw = bodyW
        } else if (this.bw > 991 && bodyW < 991) {
          this.menuShow = false
          this.bw = bodyW
        }
      }, 150)
    }
  },
  methods: {
    menuClick(menu) {
      if (this.$route.path === menu.link) return
      this.currentIndex = menu.id
      if (this.bw < 991) {
        this.menuShow = false
      }
      this.$router.push({
        path: menu.link,
      })
    },
  },
  // watch: {
  //   '$route.path'(oldV) {
  //     this.menus.forEach((item) => {
  //       if (oldV.indexOf(item.link) !== -1) {
  //         this.currentIndex = item.id
  //       }
  //     })
  //   },
  // },
}
</script>

<style lang="less" scoped>
.menu-box {
  user-select: none;
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
  transition-duration: 0.2s;
  box-shadow: 0 1px 1px #ccc;
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
      line-height: 18px;
      padding: 0 6px;
      background-color: #ccc;
      border-radius: 9px;
      color: #fff;
    }
  }
  .iconfont {
    font-size: 13px;
    margin-right: 8px;
  }
}
</style>
