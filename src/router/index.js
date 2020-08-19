import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 前台页面
const Index = () => import('@/views/Index')
const Home = () => import('@/views/Home')
const Tags = () => import('@/views/Tags')
const Categories = () => import('@/views/Categories')
const Arch = () => import('@/components/common/arch')

const Archives = () => import('@/views/Archives')
const Posts = () => import('@/views/Posts')
const NotFound = () => import('@/views/NotFound')

// 后台admin页面
const Admin = () => import('@/admin/Admin')
const Art = () => import('@/admin/arts')

const routes = [
  {
    path: '/',
    name: 'Index',
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
        path: '/posts/:id/:title',
        name: 'Posts',
        component: Posts,
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'Art',
        component: Art
      }
    ]
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

export default router
