const express = require('express')
const router = express.Router()

const userCtr = require('../controllers/userCtr')

// 获取用户信息
router.get('/getUserInfo', userCtr.getUserInfo)

// 登录操作
router.post('/login', userCtr.login)

// 更改用户信息
router.put('/update', userCtr.updateUserInfo)

module.exports = router
