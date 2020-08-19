// ------------- 对文章的操作 ------------

const express = require('express')
const router = express.Router()

// ------------- 控制器 ------------
const artCtr = require('../controllers/articleCtr')

// ------------- 路由 -------------
// 获取文章详情
router.get('/getArts', artCtr.getArts)
// 获取文章总数
router.get('/nums', artCtr.getArtsNum)
router.get('/getArtById', artCtr.getArtById)



// 添加文章
router.post('/addArt', artCtr.addArt)

module.exports = router
