<template>
  <div class="toast" :class="[show ? isType : '']">{{ text }}</div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // 提示文本
    text: {
      type: String,
      default: '提示信息'
    },
    // 控制显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    // 控制显示时间，默认为2s
    duration: {
      type: Number,
      default: 2000
    },
    // toast样式
    type: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    isType () {
      const types = ['info', 'success', 'waring', 'error']
      if (types.indexOf(this.type) !== -1) {
        return this.type
      } else {
        throw Error('type参数错误，只能是info/success/waring/error中的一个') 
      }
    }
  }
}
</script>

<style scoped lang='less'>
  .toast{
    position: fixed;
    left: 50%;
    top: -60px;
    font-size: 14px;
    width: 400px;
    padding: 16px 20px;    
    border-radius: 5px;
    transform: translateX(-50%);
    z-index: 9999;
    text-align: center;
    &.success {
      background-color: #f0f9eb;
      top: 20px;
      color: #67c23a;
    }
    &.info {
      background-color: #edf2fc;
      color:#909399;
      top: 20px;
    }
    &.waring {
      background-color: #fdf6ec;
      color: #e6a23c;
      top: 20px;
    }
    &.error {
      background-color: #fde2e2;
      color: #ed4014;
      top: 20px;
    }
  }
</style>