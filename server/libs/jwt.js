// ------------------ 通过token验证用户是否登录的中间件 -----------------

const jwt = require('jsonwebtoken')

const secret = require('../config/token.config').secret

/**
 * 生成token
 */
function createToken (username, password) {
  const token = jwt.sign({
    username,
    password
  }, secret, { expiresIn: '24h'})
  return token
}

/**
 * 验证token
 */
function verifyToken (token) {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch(err) {
    // err
    return err
  }
}

module.exports = {
  createToken,
  verifyToken
}
