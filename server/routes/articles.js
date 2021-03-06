// ------------- 对文章的操作 ------------

const express = require('express')
const router = express.Router()

// ------------- 控制器 ------------
const artCtr = require('../controllers/articleCtr')

// ------------- get操作 -------------
// 获取文章详情
router.get('/getArts', artCtr.getArts)
// 获取文章总数
router.get('/nums', artCtr.getArtsNum)
// 通过文章id获取文章详情
router.get('/getArtById', artCtr.getArtById)
// 通过关键词搜索相关文章
router.get('/search', artCtr.search)
// 搜索已被软删除的文章is_show = 0
router.get('/recycle', artCtr.getRecycle)


// ------------- post操作 -------------
// 添加文章
router.post('/addArt', artCtr.addArt)


// ------------- put操作 -------------
// 控制文章是否置顶
router.put('/top', artCtr.optTop)
// 控制文章是否显示(此处为软删除)
router.put('/show', artCtr.setArtShow)
// 设置谋篇文章阅读数
router.put('/setReadNum', artCtr.setReadNum)
// 更新文章
router.put('/updateArt', artCtr.updateArt)


module.exports = router
