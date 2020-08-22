// ###################################################################
// #                                                                 #
// #                              后台部分                            #
// #                                                                 #
// ###################################################################


import axios from '@/axios/index'
axios.defaults.baseURL = '/api'

// --------------- post请求(修改) ---------------
/**
 * 图片上传
 */
export const upImg = (url, data) => axios.post(url, data, {headers: { 'Content-Type': 'multipart/form-data' }})
