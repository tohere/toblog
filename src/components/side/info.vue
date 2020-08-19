<template>
  <!-- 作者信息组件info -->
  <div class="info flex-center" v-if="userInfo.id">
    <div class="userimg">
      <img :src="userInfo.userimg" alt="">
    </div>
    <div class="username">
      <h2>{{ userInfo.name }}</h2>
      <span class="blogname">{{ userInfo.name }}的博客</span>
    </div>
    <!-- 统计部分 -->
    <div class="statistics">
      <div @click="clickC(item.name)" class="flex-col-center" v-for="(item, index) in statistics" :key="index">
        <b>{{ item.num }}</b>
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  props: {
    userInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    statistics: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    clickC (name) {
      let path = ''
      if (name === 'arch') {
        path = '/archives'
      } else if (name === 'cate') {
        path = '/categories'
      } else if (name === 'tag') {
        path = '/tags'
      }
      this.$router.push({path})
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