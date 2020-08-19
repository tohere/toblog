// 数据库配置
const mysql = require('mysql')
const myCreatePool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'toblog',
  multipleStatements: true // 支持执行多条 sql 语句
})

module.exports = myCreatePool
