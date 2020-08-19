// --------------------- 关键词操作 ------------------
const express = require('express')
const router = express.Router()

// --------------------- 关键词控制器 ------------------
const tagCtr = require('../controllers/tagCtr')

// 获取所有关键词
router.get('/all', tagCtr.getAllTags)
// 获取某一篇文章的关键词
router.get('/getTags', tagCtr.getOneArtTags)

module.exports = router
