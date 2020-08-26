<template>
  <!-- article头部组件 -->
  <div class="article-top" v-if="articleInfo.title">
    <h1 class="title">
      <router-link :to="'/posts/'+ articleInfo.id + '/' + articleInfo.title">{{ articleInfo.title }}</router-link>
    </h1>
    <div class="top flex-center">
      <span>
        <i class="iconfont" :class="articleInfo.istop ? 'icon-ding1' : 'icon-ding'"></i>
        <span class="to-top dot" title="置顶">置顶</span>
      </span>
      <span>
        <i class="iconfont icon-calender"></i>
        <span class="publish hidden-sm-and-down">发表于 </span>
        <span class="dot" :title="'创建时间 ' + publishTime">{{
          publishTime | formatDate
        }}</span>
      </span>
      <span v-if="articleInfo.updateTime">
        <i class="iconfont icon-update"></i>
        <span class="update hidden-sm-and-down">更新于 </span>
        <span class="dot" :title="'修改时间 ' + updateTime">{{
          updateTime | formatDate
        }}</span>
      </span>
      <span v-if="cates.length > 0">
        <i class="iconfont icon-folder"></i>
        <span class="cate hidden-sm-and-down">分类于 </span>
        <span v-for="(cate, index) in cates" :key="index">
          <a href="javascript:;" class="link" @click="goCate(cate)">{{ cate }}</a>
          <!-- <router-link class="link" :to="'/categories/' + cate">{{
            cate
          }}</router-link> -->
          <span v-if="index !== cates.length-1"> ，</span>
        </span>
      </span>
      <span title="阅读次数">
       <i class="iconfont icon-yanjing"></i>
        <span class="update hidden-sm-and-down">阅读次数:&nbsp;</span>
        <span class="dot">{{
          articleInfo.readnums
        }}</span>
      </span>
    </div>
    <div class="bottom flex-center">
      <span>
        <i class="iconfont icon-word"></i>
        <span class="txt-num">本文字数 : {{ artNums }}</span>
      </span>
      <span>
        <i class="iconfont icon-clock"></i>
        <span class="read-time">阅读时长 ≈ {{ readTime }}</span>
      </span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { strFilter } from '../../libs/strFilter'
import { dateFormat } from '../../libs/dateFormat'
import { getArtsByCateId } from '@/api/get'
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
  filters: {
    formatDate (date) {
      return date.split(' ')[0]
    }
  },
  computed: {
    publishTime () {
      return dateFormat(this.articleInfo.pub_time)
    },
    updateTime () {
      return dateFormat(this.articleInfo.up_time)
    },
    // 将字符串分类拆分成数组
    cates () {
      if (this.articleInfo.cates) {
        return this.articleInfo.cates.split(',')
      }
      return ''
    },
    // 计算文章总字数
    artNums () {
      if (this.articleInfo.content) {
        let len = strFilter(this.articleInfo.content).length
        if (len >= 1000) {
          // 超过1000字数变为k显示
          len = (len / 1000).toFixed(1) + 'k'
        }
        return len
      }
      return 0
    },
    // 计算阅读时间
    readTime () {
      if (this.articleInfo.content) {
        let len = strFilter(this.articleInfo.content).length
        return Math.ceil(len / 1000) + ' 分钟'
      }
      return '0 分钟'
    }
  },
  methods: {
    goCate (cate) {
      getArtsByCateId({
        cate,
        page: 1,
        pageSize: 10
      }).then(res => {
        if (res.status === 1) {
          this.$router.push({
            path: `/categories/${res.cateId}/${cate}`
          })
        } else {
          throw Error(res.err)
        }
      }).catch(err => {
        throw Error(err)
      })
    }
  }
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
      line-height: 2;
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
