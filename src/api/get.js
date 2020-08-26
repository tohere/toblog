// ###################################################################
// #                                                                 #
// #                              前台部分                            #
// #                                                                 #
// ###################################################################


import axios from '@/axios/index'
axios.defaults.baseURL = '/api'

// ------------------------------ get请求(查询) ------------------------------

/*
给添加了一个admin字段区分是前台还是后台的请求，主要是验证admin页面操作是否登录或者登录过期
*/
// -------------------------- 用户部分部分 -------------------------------
/**
 * 获取用户信息
 */
export const getUserInfo = (admin='') => axios.get('/user/getUserInfo', {params: {admin}})




// -------------------------- 文章详情部分 -------------------------------
// 请求文章详情
export const getArticles = (params) => axios.get('/articles/getArts', params)
// 获取文章总数
export const getArtsNum = (admin='') => axios.get('/articles/nums', {params: {admin}})
// 通过文章id请求文章详情
export const getArtById = (id, admin='') => axios.get('/articles/getArtById', {params: {id, admin}})
// 通过关键词搜索文章
export const searchByWord = (word, page, pageSize, admin) => axios.get('/articles/search', {params: {word, page, pageSize, admin}})
// 获取已被软删除的文章is_show = 0
export const getRecycle = (admin='') => axios.get('/articles/recycle', {params: {admin}})
// 通过分类id获取文章
export const getArtsByCateId = (params) => axios.get('/cates/getArtsByCateId', {params})




// -------------------------- 文章分类部分 -------------------------------
// 请求分类标签
export const getCates = (all='', admin='') => axios.get('/cates/getCates', {params: {all, admin}})
// 通过文章id获取分类ids
// id 文章id
export const getCateIds = (id, admin='') => axios.get('/cates/getCateIds', {params: {id, admin}})



// -------------------------- 文章关键词部分 -------------------------------
// 获取关键词
export const getTags = (admin='') => axios.get('/tags/all', {params: {admin}})
// 通过文章id获取关键词ids
// id 文章id
export const getTagIds = (id, admin='') => axios.get('/tags/getTagIds', {params: {id, admin}})


// -------------------------- 归档部分 -------------------------------
export const getArchs = (params) => axios.get('/archs/getArchs', params)


