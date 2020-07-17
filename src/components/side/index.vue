<template>
  <aside>
    <!-- 侧边栏上方部分 -->
    <div class="side-top">
      <!-- logo部分 -->
      <Logo></Logo>
      <!-- tab部分 -->
      <Menu></Menu>
    </div>

    <!-- 侧边栏下方部分 -->
    <div class="side-bot">
      <!-- 作者介绍 -->
      <Info></Info>
      <!-- 订阅部分 -->
      <Rss></Rss>
      <!-- 标签云部分 -->
    </div>
  </aside>
</template>

<script>
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
  }
}
</script>

<style scoped lang='less'>
aside {
  width: 240px;
  height: 100%;
  .side-bot {
    margin-top: 10px;
    background-color: #fff;
  }
}

</style>