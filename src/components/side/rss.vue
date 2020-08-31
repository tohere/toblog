<template>
  <!-- rss订阅部分 -->
  <div class="rss">
    <!-- <div class="icon flex-center">
      <i class="iconfont icon-rss"></i>
      <span>RSS</span>
    </div> -->
    <!-- 订阅链接 -->
    <!-- <ul class="links">
      <li v-for="(link, index) in rsslinks" :key="index">
        <a :href="link.link">
          <i class="iconfont" :class="link.icon"></i>
          <span>{{ link.name }}</span>
        </a>
      </li>
    </ul> -->
    <!-- 友链 -->
    <div class="friendly" v-if="friendlinks.length">
      <div class="title">
        <i class="iconfont icon-friend-link"></i>
        <span>友情链接</span>
      </div>
      <ul class="friend-links">
        <li v-for="(link, index) in friendlinks" :key="index">
          <a :href="link.link" :title="link.link" target="_blank">
            {{ link.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "rss",
  props: ['friendlinks'],
  data() {
    return {
      rsslinks: [
        { name: "GitHub", icon: "icon-git", link: "https://wwww.baidu.com" },
        { name: "GitHub", icon: "icon-git", link: "https://wwww.baidu.com" },
        { name: "GitHub", icon: "icon-git", link: "https://wwww.baidu.com" },
        { name: "GitHub", icon: "icon-git", link: "https://wwww.baidu.com" },
        { name: "GitHub", icon: "icon-git", link: "https://wwww.baidu.com" }
      ],
      // friendlinks: [
      //   { name: "百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度百度", link: "https://wwww.baidu.com" },
      //   { name: "百度", link: "https://wwww.baidu.com" },
      //   { name: "百度", link: "https://wwww.baidu.com" }
      // ]
    };
  }
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  padding: 0;
}
a {
  text-decoration: none;
  color: #333;
}
.rss {
  padding: 0 10px;
  cursor: default;
  .icon {
    width: 100%;
    height: 35px;
    line-height: 35px;
    font-size: 18px;
    text-align: center;
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
    color: #fc6423;
    .iconfont {
      font-size: 16px;
      margin-right: 2px;
    }
  }
  .links {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    font-size: 13px;
    padding: 0;
    li {
      width: 50%;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      color: #333;
      cursor: pointer;
      text-align: center;
      opacity: .8;
      transition-duration: 0s;
      .iconfont {
        font-size: 13px;
        margin-right: 4px;
      }
      &:hover {
        background-color: #f2f2f2;
        opacity: 1;
      }
    }
  }
  .friendly {
    margin-top: 20px;
    font-size: 13px;
    .title {
      font-size: 13px;
      text-align: center;
      .iconfont {
        font-size: 13px;
        margin-right: 2px;
      }
    }
    li {
      text-align: center;
      a {
        display: inline-block;
        border-bottom: 1px dashed #ccc;
        line-height: 30px;
        height: 30px;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 8px;
        opacity: 0.8;
        transition-duration: 0s;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
