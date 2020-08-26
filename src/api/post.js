// ###################################################################
// #                                                                 #
// #                              后台部分                            #
// #                                                                 #
// ###################################################################


import axios from '@/axios/index'
axios.defaults.baseURL = '/api'

// --------------- post请求 ---------------


/**
 * 登录
 * username   用户名
 * password   密码
 */
export const login = (username, password) => axios.post('/user/login', {username, password})

/**
 * 图片上传
 */
export const upImg = (data) => axios.post('/files/upload', data, {headers: { 'Content-Type': 'multipart/form-data' }})


/**
 * 添加新分类
 * title 新分类名称
 */
export const addCate = (title) => axios.post('/cates/addCate', {title})


/**
 * 添加新的关键词
 * title 关键词名称
 */
export const addTag = (title) => axios.post('/tags/addTag', {title})


/**
 * 添加文章
 * title    文章标题
 * content  文章内容
 */
export const addArt = (title, content) => axios.post('/articles/addArt', {title, content})


/**
 * 添加文章/分类对应关系
 * 
 * artId    文章id     String
 * cates    分类数组   Array
 */
export const addArtCate = (artId, cates) => axios.post('/cates/addArtCateFK', {artId, cates})



/**
 * 添加文章/关键词对应关系
 * 
 * artId    文章id     String
 * tags     分类数组   Array
 */
export const addArtTag = (artId, tags) => axios.post('/tags/addArtTagFK', {artId, tags})
