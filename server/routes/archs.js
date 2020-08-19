// --------------------- 归档操作 ---------------------
const express = require('express')
const router = express.Router()

// --------------------- 归档控制器 ---------------------
const archCtr = require('../controllers/archCtr')

router.get('/getArchs', archCtr.getArchs)

module.exports = router
