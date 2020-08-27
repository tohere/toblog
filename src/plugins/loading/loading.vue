<template>
  <!-- loading组件 -->
  <div class="loading" v-show="show">
    <div class="loading-box">
      <ul class="inner">
        <li v-for="item in 12" :key="item" :style="{transform: 'rotateZ(' + item * 30 + 'deg) translateY(20px)', opacity: item * 0.1}"></li>
        <!-- <li v-for="item in 7" :key="item" :style="{top: + item * 10 +'px'}"></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  .loading-box {
    position: relative;
    width: 100px;
    height: 100px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
    animation: rotateLoading 1.5s linear infinite;
      list-style: none;
      width: 100%;
      height: 100%;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transform-origin: center;
      background-color: transparent;
    }
    li {
      position: absolute;
      width: 2px;
      height: 16px;
      background-color: #999;
    }
  }
}
@keyframes rotateLoading {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
