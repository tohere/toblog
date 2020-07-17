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
  display: flex;
  height: 3000px;
}
aside, main {
  height: 100%;
  float: left;
}
aside {
  width: 240px;
}
main {
  margin-left: 10px;
  background-color: red;
  width: 100%;
}
@media only screen and (max-width: 991px) {

}

@media only screen and (min-width: 992px) {
  #app {
    padding: 0 20px;
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
