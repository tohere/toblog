<template>
  <!-- 首页页面 -->
  <div id="index">
    <!-- 侧边栏 -->
    <aside>
      <Side class="side"></Side>
    </aside>
    <!-- 主题内容部分 -->
    <main ref="content">
      <keep-alive exclude="Posts">
        <router-view></router-view>
      </keep-alive>
    </main>
  </div>
</template>

<script>
import Side from '@/components/side'
export default {
  name: 'Index',
   components: {
    Side,
  },
}
</script>

<style lang="less" scoped>
#index {
  width: 100%;
  height: 100%;
}
main {
  float: right;
  height: 100%;
  width: calc(100% - 250px);
  background-color: #fff;
  box-shadow: 2px 2px 5px #999;
  padding: 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 0px;
    background-color: #ebe7e7;
    border-radius: 6px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: #0ec7fe;
    border-radius: 6px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
}
aside {
  position: relative;
  width: 100%;
  float: left;
  z-index: 30;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE 10+ */
}
// 给mavon中高亮代码边框加圆角
.hljs {
  border-radius: 5px;
}
// 将代码高亮边框的左右内边距去掉
.markdown-body pre {
  padding: 10px 0 !important;
}

@media only screen and (max-width: 991px) {
  aside {
    width: 100%;
  }
  main {
    width: 100%;
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    -ms-overflow-style: none; /* IE 10+ */
  }
}

@media only screen and (min-width: 992px) {
  #app {
    padding: 0 20px;
    display: flex;
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
