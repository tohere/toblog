<template>
  <!-- 404页面 -->
  <div id="not-found" class="flex-center">
    <h1>页面不存在</h1>
    <div class="go-pre" @click="$router.go(-1)">点击这里返回上一页</div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang='less' scoped>
#not-found {
  width: 100%;
  height: 100%;
  flex-direction: column;
  h1 {
    font-size: 26px;
  }
  .go-pre {
    color: blue;
    border-bottom: 2px solid blue;
    line-height: 30px;
    cursor: pointer;
    opacity: .7;
    transition-duration: 0s;
    &:hover {
      opacity: 1;
    }
  }
}
</style>