<template>
  <!-- 侧边栏logo组件 -->
  <div id="logo" v-if="userInfo.id" class="flex-center">
    <div class="username">
      <div>{{ userInfo.name }}的博客</div>
    </div>
    <div class="desc">{{ userInfo.desc }}</div>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    userInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  }
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