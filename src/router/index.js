import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('@/views/Home')

const routes = [
  {
    path: '/',
    name: 'Home',
    components: Home
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router
