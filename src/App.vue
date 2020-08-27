<template>
  <div id="app">
    <div class="line"></div>
    <router-view></router-view>
    <to-top :el="el"></to-top>
  </div>
</template>

<script>
import ToTop from '@/components/common/totop'

export default {
  name: 'App',
  components: {
    ToTop
  },
  data() {
    return {
      el: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.el = this.$refs.content
    })
  },
  methods: {},
}
</script>

<style lang="less">
@import url('./assets/fonts/fonts.css');
* {
  box-sizing: border-box;
  transition: all 0.5s;
}
html,
body,
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f2f2f2;
  font-family: 'Monda', 'pingfang', 'Microsoft YaHei', sans-serif;
}
.line {
  width: 100%;
  height: 3px;
  background-color: @black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

// 给mavon中高亮代码边框加圆角
.hljs {
  border-radius: 5px;
}
// 将代码高亮边框的左右内边距去掉
.markdown-body pre {
  padding: 10px 0 !important;
}

@media only screen and (min-width: 992px) {
  #app {
    padding: 0 20px;
    display: flex;
  }
}
@media only screen and (min-width: 1200px) {
  #app {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
