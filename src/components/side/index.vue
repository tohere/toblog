<template>
  <aside>
    <!-- 侧边栏上方部分 -->
    <div class="side-top">
      <!-- logo部分 -->
      <Logo :userInfo="userInfo"></Logo>
      <!-- tab部分 -->
      <Menu :menus='menus'></Menu>
    </div>

    <!-- 侧边栏下方部分 -->
    <div class="side-bot hidden-sm-and-down">
      <!-- 作者介绍 -->
      <Info :userInfo="userInfo" :statistics="statistics"></Info>
      <!-- 订阅部分 -->
      <Rss :friendlinks="links"></Rss>
      <!-- 标签云部分 -->
    </div>
  </aside>
</template>

<script>

import { getUserInfo } from '@/api/get'

import Logo from './logo'
import Menu from './menu'
import Info from './info'
import Rss from './rss'
export default {
  name: 'Side',
  components: {
    Logo,
    Menu,
    Info,
    Rss
  },
  data () {
    return {
      userInfo: {},
      statistics: [],
      links: []
    }
  },
  created () {
    this.getInfo()
  },
  computed: {
    menus() {
      const menus = [
        { id: 1, icon: 'home', title: '首页', link: '/', name: 'home' },
        { id: 2, icon: 'biaoqian', title: '标签', link: '/tags', name: 'tag' },
        {
          id: 3,
          icon: 'fenlei',
          title: '分类',
          link: '/categories',
          name: 'cate',
        },
        {
          id: 4,
          icon: 'guidang',
          title: '归档',
          link: '/archives',
          name: 'arch',
        },
        { id: 5, icon: 'yonghu', title: '关于', link: '/about', name: 'about' },
        {
          id: 6,
          icon: 'search',
          title: '搜索',
          link: '/search',
          name: 'search',
        },
      ]
      menus.map((menu) => {
        this.statistics.forEach((num) => {
          if (num.name === menu.name) {
            menu.nums = num.num
            return menu
          }
        })
      })
      return menus
    },
  },
  methods: {
    getInfo () {
      getUserInfo().then(res => {
        if (res.status === 1) {
          this.userInfo = res.data.userInfo
          this.statistics = res.data.statistics
          this.links = res.data.links
          console.log(res)
        } else {
          throw Error(res.err)
        }
      }).catch(err => {
        throw Error(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
aside {
  width: 100%;
  height: 100%;
  .side-bot {
    margin-top: 10px;
    background-color: #fff;
  }
}
</style>
