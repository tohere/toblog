// 数据库相关操作
const myCreatePool = require('../config/database.config')

// 查询操作
const query = (sql, arr=[], cb) => {
  myCreatePool.getConnection(function(err, connection) {
    if (err) throw err // not connected!

    // Use the connection
    connection.query(sql, arr, function(error, results, fields) {
      // When done with the connection, release it.
      connection.release()

      // Handle error after the release.
      if (error) throw error
      // Don't use the connection here, it has been returned to the pool.
      cb(error, results, fields)
    })
  })
}

module.exports = query
