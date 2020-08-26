<template>
  <!-- admin主页 -->
  <div id="admin">
    <aside>
      <Logo :userInfo="userInfo"></Logo>
      <Menu :menus="menus"></Menu>
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/get'

import Logo from '@/components/side/logo'
import Menu from '@/components/side/menu'

export default {
  name: 'Admin',
  components: {
    Logo,
    Menu,
  },
  data() {
    return {
      userInfo: {},
      menus: [
        { id: 1, icon: 'shuji', title: '文章', link: '/admin', name: 'arts' },
        {
          id: 2,
          icon: 'fenlei',
          title: '分类',
          link: '/admin/cates',
          name: 'cate',
        },
        {
          id: 3,
          icon: 'biaoqian',
          title: '标签',
          link: '/admin/tags',
          name: 'tag',
        },
        {
          id: 4,
          icon: 'yonghu',
          title: '用户',
          link: '/admin/user',
          name: 'user',
        },
        {
          id: 5,
          icon: 'huishouzhan',
          title: '回收站',
          link: '/admin/recycle',
          name: 'recycle',
        },
      ],
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getUserInfo('admin')
        .then((res) => {
          if (res.status === 1) {
            this.userInfo = res.data.userInfo
          } else {
            throw Error(res.err)
          }
        })
        .catch((err) => {
          throw Error(err)
        })
    },
  },
}
</script>

<style lang="less" scoped>
#admin {
  width: 100%;
  height: 100%;
}
aside {
  width: 100%;
  float: left;
  background-color: #fff;
  /deep/ .menu {
    box-shadow: none;
  }
}
main {
  width: calc(100% - 250px);
  height: calc(100% - 120px);
  float: right;
  padding: 20px;
  background-color: #fff;
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 0px;
    background-color: #ebe7e7;
    border-radius: 6px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: #0ec7fe;
    border-radius: 6px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
}
@media only screen and (max-width: 991px) {
  aside {
    width: 100%;
  }
  main {
    width: 100%;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    -ms-overflow-style: none; /* IE 10+ */
  }
}

@media only screen and (min-width: 992px) {
  aside,
  main {
    height: 100%;
  }
  aside {
    width: 240px;
    display: block;
  }
}
</style>
