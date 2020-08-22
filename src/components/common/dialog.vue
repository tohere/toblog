<template>
  <!-- dialog操作提示组件 -->
  <div class="dialog" v-show="show">
    <div class="inner">
      <div class="remind">{{ remind }}</div>
      <div class="title">{{ title }}</div>
      <div class="btn">
        <button class="cancel" @click="clickBtn('cancel')">取消</button>
        <button class="confirm" @click="clickBtn('confirm')">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    remind: {
      type: String,
      default: '提示'
    },
    title: {
      type: String,
      default: '提示内容'
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickBtn (param) {
      this.$emit('close', param)
    }
  }
}
</script>


<style lang="less" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    width: 50%;
    min-height: 200px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .remind {
      font-size: 18px;
    }
    .title {
      padding: 20px;
    }
    .btn {
      text-align: right;
      font-size: 14px;
      button {
        width: 80px;
        height: 40px;
        margin-right: 20px;
        border-radius: 5px;
        outline: none;
        border: none;
        cursor: pointer;
        transition-duration: 0s;
        &.cancel {
          background-color: #fff;
          border: 1px solid #ccc;
          &:hover {
            background-color: #ecf5ff;
            color: #409eff;
          }
        }
        &.confirm {
          background-color: #409eff;
          color: #fff;
          &:hover {
            opacity: .8;
          }
        }
      }
    }
  }
}
</style>
