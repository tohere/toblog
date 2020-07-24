<template>
  <!-- archive组件 -->
  <div class="archive">
    <div class="all dot">共计 19 篇日志</div>
    <div class="posts" v-for="posts in archives" :key="posts.id">
      <h1 class="dot">2020</h1>
      <ul class="article">
        <li class="dot" v-for="article in posts.articles" :key="article.id">
          <time>{{ article.publishTime }}</time>
          <h2>
            <router-link :to="article.link">{{ article.title }}</router-link>
          </h2>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 200,
      archives: [
        {
          id: 1,
          year: '2020',
          articles: [
            {
              id: 1,
              title: 'win10下安装deepin双系统win10下安装deepin双系统win10下安装deepin双系统win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 2,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 3,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 4,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 6,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 5,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
          ],
        },
        {
          id: 1,
          year: '2020',
          articles: [
            {
              id: 1,
              title: 'win10下安装deepin双系统win10下安装deepin双系统win10下安装deepin双系统win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 2,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 3,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 4,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 6,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 5,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
          ],
        },{
          id: 1,
          year: '2020',
          articles: [
            {
              id: 1,
              title: 'win10下安装deepin双系统win10下安装deepin双系统win10下安装deepin双系统win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 2,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 3,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 4,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 6,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
            {
              id: 5,
              title: 'win10下安装deepin双系统',
              publishTime: '7-21',
              link: '/posts/1',
            },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.dot::before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #ccc;
  border-radius: 50%;
  top: 13px;
  left: -2px;
  z-index: 10;
}
.archive {
  position: relative;
  top: 20px;
  left: 0px;
  right: 0px;
  bottom: 20px;
  padding: 20px 0;
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    background-color: #eee;
    top: 40px;
    left: 40px;
    bottom: 0;
    right: 0;
  }
  .all {
    position: relative;
    margin-left: 40px;
    padding-left: 20px;
    font-size: 24px;
    top: 0px;
    left: 0px;
    &::before {
      width: 12px;
      height: 12px;
      left: -4px;
    }
  }
  h1 {
    position: relative;
    padding-left: 20px;
    margin: 60px 0;
    font-size: 28px;
  }
  .posts {
    padding-left: 40px;
  }
  .article {
    list-style-type: none;
    padding-left: 0;
    width: 100%;
    li {
      position: relative;
      padding: 5px 20px;
      margin-top: 30px;
      display: flex;
      align-items: center;
      height: 32px;
      font-size: 12px;
      border-bottom: 1px dashed #ccc;
      color: #999;
      time {
        width: 30px;
        flex-shrink: 0;
      }
      h2 {
        padding-left: 8px;
      }
      a {
        text-decoration: none;
        font-size: 14px;
        padding-left: 5px;
        color: #999;
        vertical-align: top;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .archive {
    margin-left: -40px;
  }
}
</style>
