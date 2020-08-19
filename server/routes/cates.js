// --------------------- 分类操作 ------------------

const express = require('express')
const router = express.Router()

// --------------------- 控制器 ------------------
const cateCtr = require('../controllers/cateCtr')

// --------------------- 路由 ------------------

router.get('/getCates', cateCtr.getAllCates)
router.get('/getArtsByCateId', cateCtr.getArtsByCateId)

module.exports = router
