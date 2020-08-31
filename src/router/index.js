import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('@/admin/Login')

// 前台页面
const Index = () => import('@/views/Index')
const Home = () => import('@/views/Home')
const Tags = () => import('@/views/Tags')
const Categories = () => import('@/views/Categories')
const Arch = () => import('@/components/common/arch')

const Archives = () => import('@/views/Archives')
const Posts = () => import('@/views/Posts')
const About = () => import('@/views/About')
const Search = () => import('@/views/Search')
const Chat = () => import('@/views/Chat')
const NotFound = () => import('@/views/NotFound')

// 后台admin页面
const Admin = () => import('@/admin/Admin')
const Art = () => import('@/admin/arts')
const AdminCates = () => import('@/admin/cates')
const Recycle = () => import('@/admin/recycle')
const AdminTags = () => import('@/admin/tags')
const AdminUser = () => import('@/admin/user')
const Write = () => import('@/admin/arts/write')
const Edit = () => import('@/admin/arts/edit')

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/tags',
        name: 'Tags',
        component: Tags,
        children: [
          {
            path: ':id/:title',
            name: 'TagArch',
            component: Arch,
            meta: {
              cate: 'tag',
            },
          },
        ],
      },
      {
        path: '/categories',
        name: 'Categories',
        component: Categories,
        children: [
          {
            path: ':id/:title',
            name: 'CateArch',
            component: Arch,
            meta: {
              cate: 'cate',
            },
          },
        ],
      },
      {
        path: '/archives',
        name: 'Archives',
        component: Archives,
        meta: {
          cate: 'log',
        },
      },
      {
        path: '/about',
        name: 'About',
        component: About,
      },
      {
        path: '/search',
        name: 'Search',
        component: Search,
      },
      {
        path: '/posts/:id/:title',
        name: 'Posts',
        component: Posts,
      },
      {
        path: '/chat',
        name: 'Chat',
        component: Chat
      }
    ],
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'Art',
        component: Art,
      },
      {
        path: 'cates',
        name: 'AdminCates',
        component: AdminCates,
      },
      {
        path: 'recycle',
        name: 'Recycle',
        component: Recycle,
      },
      {
        path: 'tags',
        name: 'AdminTags',
        component: AdminTags,
      },
      {
        path: 'user',
        name: 'AdminUser',
        component: AdminUser,
      },
      {
        path: 'write',
        name: 'Write',
        component: Write,
      },
      {
        path: 'edit/:id',
        name: 'Edit',
        component: Edit,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new Router({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  // 判断是不是登录页面
  if (to.fullPath === '/login') {
    return next()
  }
  // 判断是不是后台页面
  if (to.fullPath.indexOf('/admin') !== -1) {
    // 判断是否拿到login字段
    if (localStorage.getItem('isLogin')) {
      // 有isLogin，继续下一步
      next()
    } else {
      // 没有isLogin字段，跳转到login页面
      next('/login')
    }
  } else {
    // 不是后台页面，继续
    next()
  }
})

export default router
