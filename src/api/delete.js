// ###################################################################
// #                                                                 #
// #                              后台部分                            #
// #                                                                 #
// ###################################################################


import axios from '@/axios/index'
axios.defaults.baseURL = '/api'

// ------------------------------ delete请求(删除) ------------------------------

// ------------------------- 分类部分 -------------------------
/**
 * id: 分类id
 */
export const delCateById = (id) => axios.delete('/cates/delCate', {data: {id}})




// ------------------------- 标签部分 -------------------------

export const delTagById = (id) => axios.delete('/tags/delTag', {data: {id}})



// ------------------------- 文章部分 -------------------------

/**
 * 图片删除操作
 */
export const delImg = (filename) => axios.delete('/files/delete', {data: {filename}})

/**
 * 根据文章id删除对应的关键词ids
 * id   文章id
 */
export const delTagIds = (id) => axios.delete('/tags/delIds', {data: {id}})

/**
 * 根据文章id删除对应的分类ids
 * id   文章id
 */
export const delCateIds = (id) => axios.delete('/cates/delIds', {data: {id}})

