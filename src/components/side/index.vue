<template>
  <aside>
    <!-- 侧边栏上方部分 -->
    <div class="side-top">
      <!-- logo部分 -->
      <Logo :userInfo='userInfo'></Logo>
      <!-- tab部分 -->
      <Menu :nums='statistics'></Menu>
    </div>

    <!-- 侧边栏下方部分 -->
    <div class="side-bot hidden-sm-and-down">
      <!-- 作者介绍 -->
      <Info :userInfo='userInfo' :statistics='statistics'></Info>
      <!-- 订阅部分 -->
      <Rss :friendlinks='links'></Rss>
      <!-- 标签云部分 -->
    </div>
  </aside>
</template>

<script>

import { getUserInfo } from '@/api'

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
  methods: {
    getInfo () {
      getUserInfo().then(res => {
        if (res.status === 1) {
          this.userInfo = res.data.userInfo
          this.statistics = res.data.statistics
          this.links = res.data.links
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

<style scoped lang='less'>
aside {
  width: 100%;
  height: 100%;
  .side-bot {
    margin-top: 10px;
    background-color: #fff;
  }
}

</style>