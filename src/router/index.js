import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('@/views/Home')
const Tags = () => import('@/views/Tags')
const Categories = () => import('@/views/Categories')
const Archives = () =>import('@/views/Archives')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tags/:id*',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/categories/:name*',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/archives',
    name: 'Archives',
    component: Archives
  }
  // {
  //   path: '*',
  //   redirect: '/'
  // }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router
