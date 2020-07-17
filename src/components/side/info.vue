<template>
  <!-- 作者信息组件info -->
  <div class="info flex-center">
    <div class="userimg">
      <img src="https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1667994205,255365672&fm=5" alt="">
    </div>
    <div class="username">
      <h2>明天</h2>
      <span class="blogname">明天的博客</span>
    </div>
    <!-- 统计部分 -->
    <div class="statistics">
      <div class="flex-col-center" v-for="(item, index) in statistics" :key="index">
        <b>{{ item.num }}</b>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {
      statistics: [
        { name: '日志', num: 18 },
        { name: '分类', num: 18 },
        { name: '标签', num: 18 }
      ]
    }
  }
}
</script>

<style scoped lang='less'>
.info {
  padding: 20px 10px 0 10px;
  flex-direction: column;
  .userimg {
    img {
      border-radius: 50%;
      padding: 5px;
      border: 1px solid #ccc;
      width: 126px;
      height: 126px;
    }
    &:hover {
      transform: rotateZ(360deg); 
    }
  }
  h2 {
    font-size: 18px;
    text-align: center;
    line-height: 18px;
  }
  .blogname {
    font-size: 13px;
    color: #999;
  }
  .statistics {
    display: flex;
    width: 100%;
    padding: 10px 40px;
    font-size: 16px;
    div {
      cursor: pointer;
      flex: 1;
      span {
        font-size: 13px;
        color: #999;
        padding-top: 5px;
      }
      &:nth-child(2) {
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
      }
    }
  }
}
</style>