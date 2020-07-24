<template>
  <!-- article头部组件 -->
  <div class="article-top" v-if="articleInfo">
    <h1 class="title">
      <router-link to="/">{{ articleInfo.title }}</router-link>
    </h1>
    <div class="top flex-center">
      <span>
        <i v-if="articleInfo.isTop" class="iconfont icon-ding1"></i>
        <i v-else class="iconfont icon-ding"></i>
        <span class="to-top dot" title="置顶">置顶</span>
      </span>
      <span>
        <i class="iconfont icon-calender"></i>
        <span class="publish hidden-sm-and-down">发表于 </span>
        <span class="dot" :title="'创建时间 ' + articleInfo.publishTime">{{
          publishTimeArr[0]
        }}</span>
      </span>
      <span>
        <i class="iconfont icon-update"></i>
        <span class="update hidden-sm-and-down">更新于 </span>
        <span class="dot" :title="'修改时间 ' + articleInfo.updateTime">{{
          updateTimeArr[0]
        }}</span>
      </span>
      <span>
        <i class="iconfont icon-folder"></i>
        <span class="cate hidden-sm-and-down">分类于 </span>
        <span v-for="(cate, index) in articleInfo.categories" :key="index">
          <router-link class="link" :to="'/categories/' + cate">{{
            cate
          }}</router-link>
          <span> ，</span>
        </span>
      </span>
    </div>
    <div class="bottom flex-center">
      <span>
        <i class="iconfont icon-word"></i>
        <span class="txt-num">本文字数 : {{ articleInfo.articleWords }}</span>
      </span>
      <span>
        <i class="iconfont icon-clock"></i>
        <span class="read-time">阅读时长 ≈ {{ articleInfo.readTime }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    // 将创建时间日期拆分成数组
    publishTimeArr() {
      return this.articleInfo.publishTime.split(' ')
    },
    // 将修改时间拆分成数组
    updateTimeArr() {
      return this.articleInfo.publishTime.split(' ')
    },
  },
}
</script>
<style lang="less" scoped>
.title {
    width: 100%;
    text-align: center;
    a {
      text-decoration: none;
      color: @black;
      font-weight: normal;
      font-size: 25px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #000;
        bottom: -2px;
        left: 0;
        transition: transform 0.2s;
        transform: scaleX(0);
      }
      &:hover::after {
        transform: scaleX(1);
      }
    }
  }
  .top,
  .bottom {
    font-size: 12px;
    color: #999;
    padding-top: 15px;
    flex-wrap: wrap;
    > span {
      display: inline-block;
      padding: 0 10px;
      position: relative;
      border-right: 1px solid #ccc;
      &:last-child {
        border: 0;
      }
      .to-top {
        color: blue;
      }
      .dot {
        border-bottom: 1px dashed #ccc;
        cursor: help;
      }
      .link {
        border-bottom: 1px solid #ccc;
        color: #999;
        text-decoration: none;
        transition-duration: 0s;
        &:hover {
          color: #333;
        }
      }
      .iconfont {
        font-size: 12px;
        margin-right: 4px;
      }
    }
  }
</style>
