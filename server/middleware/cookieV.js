// 通过cookie验证token

const jwt = require('../libs/jwt')
const secret = require('../config/token.config').secret

module.exports = (req, res, next) => {
  const isAdmin = req.query.admin || req.body.admin
  // 如果访问的是login接口，不需要验证
  if (req.path === '/user/login') {
    return next()
  }
  if (isAdmin) {
    const token = req.cookies.token
    const ret = jwt.verifyToken(token)
    if (ret.username) {
      next()
    } else {
      res.json({
        status: -2,
        err: '登录失败或者登录过期！'
      })
    }
  } else {
    next()
  }
}
