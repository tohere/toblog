import axios from '@/axios/index'
axios.defaults.baseURL = '/api'

// -------------------------- 用户部分部分 -------------------------------
/**
 * 获取用户信息
 */
export const getUserInfo = () => axios.get('/user/getUserInfo')


// -------------------------- 文章详情部分 -------------------------------
// 请求文章详情
export const getArticles = (params) => axios.get('/articles/getArts', params)

// 获取文章总数
export const getArtsNum = () => axios.get('/articles/nums')

// 通过文章id请求文章详情
export const getArtById = (id) => axios.get('/articles/getArtById', {params: {id}})


// -------------------------- 文章分类部分 -------------------------------
// 请求分类标签
export const getCates = () => axios.get('/cates/getCates')
export const getArtsByCateId = (params) => axios.get('/cates/getArtsByCateId', {params})



// -------------------------- 文章关键词部分 -------------------------------
// 获取关键词
export const getTags = () => axios.get('/tags/all')


// -------------------------- 归档部分 -------------------------------
export const getArchs = (params) => axios.get('/archs/getArchs', params)