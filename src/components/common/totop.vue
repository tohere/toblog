<template>
  <!-- 返回顶部组件 -->
  <div @click="toTop" class="to-top flex-center" :class="{ 'is-none': isNone }">
    <span class="iconfont icon-top"></span>
  </div>
</template>

<script>
export default {
  name: 'ToTop',
  props: {
    el: {
      type: Element,
      default() {
        return document.body
      },
    }
  },
  data() {
    return {
      isNone: true, //控制按钮显示隐藏
      elH: 0 // 元素高度
    }
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        this.isNone = this.el.scrollTop < 300
        this.elH = this.el.offsetHeight
      })
      this.el.onscroll = (e) => {
        if (e.srcElement.scrollTop > 300) {
          this.isNone = false
        } else {
          this.isNone = true
        }
      }
    }, 16)
  },
  methods: {
    toTop() {
      this.timer = setInterval(() => {
        const speed = -Math.floor(this.el.scrollTop / 5)
        this.el.scrollTop = this.el.scrollTop + speed
        if (Math.abs(speed) == 0) {
          clearInterval(this.timer)
        }
      }, 16);
    },
  },
}
</script>

<style lang="less" scoped>
.to-top {
  position: fixed;
  bottom: 150px;
  right: 80px;
  background-color: #666;
  width: 50px;
  height: 50px;
  z-index: 999;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  &.is-none {
    display: none;
  }
}
@media only screen and (max-width: 767px) {
  .to-top {
    display: none;
  }
}
</style>
