# toblog server部分笔记

## express mysql

```shell
npm i express mysql
```

> 首先配置数据库

```javascript
// database.config.js
// 数据库配置
const mysql = require('mysql')
const myCreatePool = mysql.createPool({
  connectionLimit: 10, // 数据库连接数限制，默认10
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'toblog',
  multipleStatements: true // 支持执行多条 sql 语句
})

module.exports = myCreatePool
```

> 封装数据库操作，然后在相关文件中引入即可

```javascript
// 数据库相关操作
const myCreatePool = require('../config/database.config')

// 查询操作
const query = (sql, cb) => {
  myCreatePool.getConnection(function(err, connection) {
    if (err) throw err // not connected!

    // Use the connection
    connection.query(sql, function(error, results, fields) {
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

```



## nodemon: 用于监听文件修改，重新启动node

```shell
npm i -g nodemon
```



## body-parser: 用于接收post传参

```shell
npm i body-parser
```

```javascript
// 配置body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```

