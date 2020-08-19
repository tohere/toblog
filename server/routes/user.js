const express = require('express')
const router = express.Router()

const userCtr = require('../controllers/userCtr')

router.get('/getUserInfo', userCtr.getUserInfo)

module.exports = router
