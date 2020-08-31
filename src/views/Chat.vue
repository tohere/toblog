<template>
  <!-- 聊天页面 -->
  <div class="chat">
    <chat-card></chat-card>
  </div>
</template>

<script>
import ChatCard from '@/components/chat/chatCard'
export default {
  name: 'Chat',
  components: {
    ChatCard
  }
}
</script>

<style lang="less" scoped>
.chat {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
