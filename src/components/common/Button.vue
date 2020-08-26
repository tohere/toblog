<template>
  <!-- button按钮组件 -->
  <button class="btn" :class="[size, type]" @click="clickBtn">
    <slot>按钮</slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    size: {
      type: String,
      default: 'large',
    },
    type: {
      type: String,
      default: 'default',
    },
  },
  methods: {
    // 按钮点击事件
    clickBtn (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 0s;
  color: #fff;
  &:hover {
    opacity: 0.8;
  }
  &.large {
    padding: 10px 20px;
  }
  &.medium {
    padding: 8px 16px;
    font-size: 14px;
  }
  &.small {
    padding: 9px 15px;
    font-size: 12px;
  }
  &.mini {
    padding: 7px 15px;
    font-size: 12px;
  }
  &.default {
    background-color: #fff;
    border: 1px solid #ccc;
    color: #333;
    &:hover {
      background-color: #ecf5ff;
      color: #409eff;
    }
  }
  &.primary {
    background-color: #409eff;
  }
  &.success {
    background-color: #67c23a;
  }
  &.info {
    background-color: #909399;
  }
  &.warning {
    background-color: #e6a23c;
  }
  &.danger {
    background-color: #f56c6c;
  }
}
</style>
