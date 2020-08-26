// ###################################################################
// #                                                                 #
// #                              后台部分                            #
// #                                                                 #
// ###################################################################


import axios from '@/axios/index'
axios.defaults.baseURL = '/api'

// --------------- put请求(修改) ---------------

/**
 * 更改用户信息
 */
export const update = (params) => axios.put('/user/update', params)

/**
 * id    文章id
 * top   是否置顶(0不置顶 1置顶)
 */
export const optTop = (id, top) => axios.put('/articles/top', {id, top})
/**
 * 控制文章是否显示(软删除)
 * id    文章id
 * show  0不显示  1显示
 */
export const setArtShow = (id, show) => axios.put('/articles/show', {id, show})

/**
 * 设置谋篇文章阅读数
 * id     文章id
 * num    该文章阅读数
 */
export const setReadNum = (id, num) => axios.put('/articles/setReadNum', {id, num})


