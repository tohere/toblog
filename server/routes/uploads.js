// -------------------------- 文件上传操作相关 ----------------------

const express = require('express')
const router = express.Router()
const multer = require('../libs/multer')


// ------------------ post请求 -----------------
router.post('/upload', multer.upImg)

// ------------------ delete请求 -----------------
router.delete('/delete', multer.delImg)


module.exports = router
