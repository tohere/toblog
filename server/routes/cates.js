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

// ------------- post操作 -------------
// ------------- put操作 -------------

// ------------- delete操作 -------------
router.delete('/delCate', cateCtr.delCateByid)

module.exports = router
