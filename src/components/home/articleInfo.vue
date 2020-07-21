<template>
  <!-- home页面中的文章信息组件 -->
  <div v-if="articleInfo" class="article-info">
    <h1 class="title">
      <router-link to='/'>{{ articleInfo.title }}</router-link>
    </h1>
    <div class="top flex-center">
      <span>
        <i v-if="articleInfo.isTop" class="iconfont icon-ding1"></i>
        <i v-else class="iconfont icon-ding"></i>
        <span class="to-top dot" title="置顶">置顶</span>
      </span>
      <span>
        <i class="iconfont icon-calender"></i>
        <span class="publish">发表于 </span>
        <span class="dot" :title="'创建时间 ' + articleInfo.publishTime">{{ publishTimeArr[0] }}</span>
      </span>
      <span>
        <i class="iconfont icon-update"></i>
        <span class="update">更新于 </span>
        <span class="dot" :title="'修改时间 ' + articleInfo.updateTime">{{ updateTimeArr[0] }}</span>
      </span>
      <span>
        <i class="iconfont icon-folder"></i>
        <span class="cate">分类于 </span>
        <span v-for="(cate, index) in articleInfo.categories" :key="index">
          <router-link class="link" :to="'/categories/' + cate">{{ cate }}</router-link>
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
    <div class="abstract">
      结果出得太慢，是目前美国新冠病毒检测的最大问题。美国主要病毒检测机构“奎斯特诊疗公司”发言人就证实，这家企业开展的病毒检测中，需住院医治的疑似新冠肺炎患者一般一天能拿到检测结果，但普通民众平均七天以上才能拿到结果。据说，有的密切接触者甚至等上两、三周都拿不到自己的病毒检测结果。
    </div>
    <div class="read-full">阅读全文<i class="iconfont icon-shuangyou"></i></div>
    <div class="hr"></div>
  </div>
</template>

<script>
export default {
  name: 'articleInfo',
  props: {
    articleInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      // articleInfo: {
      //   isTop: false,
      //   title: '文章标题',
      //   publishTime: '2020-07-19 23:24:25',
      //   updateTime: '2020-07-19 23:24:25',
      //   categories: ['javascript', 'nodejs'],
      //   articleWords: '2.5k',
      //   readTime: '8分钟',
      //   abstract: ''
      // }
    }
  },
  computed: {
    // 将创建时间日期拆分成数组
    publishTimeArr () {
      return this.articleInfo.publishTime.split(' ')
    },
    // 将修改时间拆分成数组
    updateTimeArr () {
      return this.articleInfo.publishTime.split(' ')
    }
  }
}
</script>

<style lang="less" scoped>
.article-info {
  .title {
    width: 100%;
    text-align: center;
    a {
      text-decoration: none;
      color: @black;
      font-weight: normal;
      font-size: 25px;
    }
  }
  .top, .bottom {
    font-size: 12px;
    color: #999;
    padding-top: 15px;
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
  .abstract {
    padding: 60px 20px 40px;
    line-height: 30px;
    font-size: 14px;
    color: #666;
  }
  .read-full {
    width: 120px;
    line-height: 30px;
    text-align: center;
    margin: 0 auto;
    color: #666;
    border: 2px solid #333;
    cursor: pointer;
    background-color: #fff;
    border-radius: 6px;
    .iconfont {
      font-size: 12px;
    }
    &:hover {
      background-color: #333;
      color: #fff;
    }
  }
  .hr {
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin: 50px 0;
  }
}
</style>
