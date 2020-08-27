import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 操作cookie
import VueCookies from 'vue-cookies' 

VueCookies.config('1d') 

// 自定义插件
import toast from './plugins/toast'
import Loading from './plugins/loading'

Vue.use(toast)
Vue.use(Loading)

// markdown解析器引入
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.prototype.$cookie = VueCookies

import 'normalize.css'

import './assets/css/index.less'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
