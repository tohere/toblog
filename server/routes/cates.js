// --------------------- 分类操作 ------------------

const express = require('express')
const router = express.Router()

// --------------------- 控制器 ------------------
const cateCtr = require('../controllers/cateCtr')

// --------------------- 路由 ------------------

// ------------- get操作 -------------
// 查询所有分类详情
router.get('/getCates', cateCtr.getAllCates)
// 通过分类id查询对应文章
router.get('/getArtsByCateId', cateCtr.getArtsByCateId)
// 通过文章id获取分类ids
router.get('/getCateIds', cateCtr.getCateIdsByArtId)


// ------------- post操作 -------------
// 添加分类
router.post('/addCate', cateCtr.addCate)
// 添加文章和分类的对应关系
router.post('/addArtCateFK', cateCtr.addArtCateFK)


// ------------- put操作 -------------

// ------------- delete操作 -------------
router.delete('/delCate', cateCtr.delCateByid)
// 通过文章id删除对应分类ids
router.delete('/delIds', cateCtr.delIds)

module.exports = router
