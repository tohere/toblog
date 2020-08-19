import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('@/views/Home')
const Tags = () => import('@/views/Tags')
const Categories = () => import('@/views/Categories')
const Arch = () => import('@/components/common/arch')

const Archives = () =>import('@/views/Archives')
const Posts = () => import('@/views/Posts')
const NotFound = () => import('@/views/NotFound') 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
          cate: 'tag'
        }
      }
    ]
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
          cate: 'cate'
        }
      }
    ]
  },
  {
    path: '/archives',
    name: 'Archives',
    component: Archives,
    meta: {
      cate: 'log'
    }
  },
  {
    path: '/posts/:id/:title',
    name: 'Posts',
    component: Posts
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router
