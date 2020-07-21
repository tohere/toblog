<template>
  <div id="app">
    <div class="line"></div>
    <!-- 侧边栏 -->
    <aside>
      <Side class="side"></Side>
    </aside>
    <!-- 主题内容部分 -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Side from "@/components/side";
export default {
  name: "App",
  components: {
    Side
  }
};
</script>

<style lang='less'>
* {
  box-sizing: border-box;
  transition: all .5s;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  background-color: #f2f2f2;
  font-family: 'Monda', "PingFang SC", "Microsoft YaHei", sans-serif;
}
.line {
  width: 100%;
  height: 3px;
  background-color: @black;
  position: fixed;
  top: 0;
  left: 0;
}
#app {
  height: 3000px;
}

main {
  margin-left: 10px;
  width: 100%;
  background-color: #fff;
  box-shadow: 2px 2px 5px #999;
}
@media only screen and (max-width: 991px) {
  aside {
    width: 100%;
  }
}

@media only screen and (min-width: 992px) {
  #app {
    padding: 0 20px;
    display: flex;
  }
  aside, main {
    height: 100%;
    float: left;
  }
  aside {
    width: 240px;
  }
  .side {
    display: block;
  }
}
@media only screen and (min-width: 1200px) {
  #app {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
