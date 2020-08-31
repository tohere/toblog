<template>
  <!-- 聊天卡片组件 -->
  <div class="chat-card" ref='chatCard'>
    <div class="card-head" @mousedown="moveCard">
      标题
    </div>
    <div class="card-body">
      自己想要说的话
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatCard',
  data () {
    return {}
  },
  methods: {
    /**
     * 卡片移动事件
     */
    moveCard (e) {
      console.log(e)
      console.dir(this.$refs.chatCard)
    }
  }
}
</script>

<style lang="less" scoped>
.chat-card {
  position: absolute;
  width: 200px;
  box-shadow: 0px 0px 5px #ccc;
  line-height: 30px;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  left: 40px;
  top: 10px;
  .card-head {
    padding: 5px 20px;
    border-bottom: 1px solid #ccc;
    text-align: center;
    font-weight: bold;
    cursor: move;
  }
  .card-body {
    padding: 5px 20px;
    font-size: 12px;
  }
}
</style>
