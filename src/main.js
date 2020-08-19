import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// markdown解析器引入
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import 'normalize.css'

import './assets/css/index.less'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
