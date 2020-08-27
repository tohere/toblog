import Vue from 'vue'
import axios from 'axios'

// 配置请求头携带cookie
axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use(config => {
  Vue.prototype.$loading.show()
  return config
}, err => {
  Vue.prototype.$loading.show()
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  Vue.prototype.$loading.hide()
  if (response.data.status === -2) {
    localStorage.removeItem('isLogin')
  }
  return response.data
}, err => {
  Vue.prototype.$loading.hide()
  localStorage.removeItem('isLogin')
  return Promise.reject(err)
})

export default axios
