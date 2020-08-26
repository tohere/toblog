// --------------------- 关键词操作 ------------------
const express = require('express')
const router = express.Router()

// --------------------- 关键词控制器 ------------------
const tagCtr = require('../controllers/tagCtr')


// --------------------- 路由 ------------------

// ------------- get操作 -------------
// 获取所有关键词
router.get('/all', tagCtr.getAllTags)
// 获取某一篇文章的关键词
router.get('/getTags', tagCtr.getOneArtTags)
// 通过文章id获取关键词ids
router.get('/getTagIds', tagCtr.getTagIdsByArtId)


// ------------- post操作 -------------
// 添加关键词
router.post('/addTag', tagCtr.addTag)
// 添加文章和关键词的对应关系
router.post('/addArtTagFK', tagCtr.addArtTagFK)

// ------------- put操作 -------------
// ------------- delete操作 -------------
router.delete('/delTag', tagCtr.delTagById)
// 通过文章id删除对应关键词ids
router.delete('/delIds', tagCtr.delIds)


module.exports = router
