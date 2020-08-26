import axios from 'axios'

// 配置请求头携带cookie
axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  if (response.data.status === -2) {
    localStorage.removeItem('isLogin')
  }
  return response.data
}, () => {
  localStorage.removeItem('isLogin')
})

export default axios
