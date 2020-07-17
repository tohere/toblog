<template>
  <!-- 侧边栏logo组件 -->
  <div id="logo" class="flex-center">
    <div class="username">
      <div>明天的博客</div>
    </div>
    <div class="desc">明天你是否会想起</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='less'>
#logo {
  width: 100%;
  height: 120px;
  background-color: @black;
  color: @white;
  flex-direction: column;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .username {
    font-size: 20px;
    line-height: 40px;
  }
  .desc {
    width: 100%;
    font-size: 12px;
    line-height: 24px;
    padding: 0 20px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #f2f2f2;
  }
}
</style>