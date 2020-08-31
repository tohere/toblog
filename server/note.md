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



## cookie-parser: 用于cookie操作

```shell
npm i cookie-parser
```

```javascript
// app.js中引入cookie-parser
const cookieParser = require('cookie-parser')

// 配置body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```



## jsonwebtoken: token验证操作

```shell
npm i jsonwebtoken
```

```javascript
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

```





## md5: 加密密码

```shell
npm i md5
```

```javascript
const md5 = require('md5')
const md5Key = '随便加点什么'
const password = md5('password' + md5Key)
```



## images: 图片压缩处理插件

```shell
npm install images
```

```javascript
images(img) //Load image from file
    .save(img, {
    //Save the image to a file, with the quality of 50
    quality: 50, //保存图片到文件,图片质量为50
  })
```



## multer: 文件上传

```shell
npm i multer
```

```javascript
// 配置multer图片上传, 这边暂时只配置单图上传

const path = require('path')
const fs = require('fs')
const multer = require('multer')

// 图片压缩处理插件
const images = require('images')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../public/statics/imgs')) // 设置文件上传位置
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname) // path.extname()可以获取文件扩展名
    const filename = Date.now() + ext // 重命名文件名称
    cb(null, filename)
  },
})

const upload = multer({
  storage,
}).single('image')
/**
 * 图片上传
 */
const upImg = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({
        status: 0,
        err,
      })
    }
    const img = path.resolve(
      __dirname,
      '../public/statics/imgs/' + req.file.filename
    )

    images(img) //Load image from file
      .save(img, {
        //Save the image to a file, with the quality of 50
        quality: 50, //保存图片到文件,图片质量为50
      })

    // 注意：此处配置了public为静态目录根目录，所以返回的时候不要带着public
    let url = `http://${req.headers.host}/statics/imgs/${req.file.filename}`
    res.json({
      status: 1,
      url,
    })
  })
}

/**
 * 根据图片名删除图片
 */
const delImg = (req, res) => {
  const filename = req.body.filename
  fs.unlink(
    path.resolve(__dirname, '../public/statics/imgs/' + filename),
    (err) => {
      if (err) {
        return res.json({
          status: 0,
          err,
        })
      }
      res.json({
        status: 1,
        msg: '删除成功',
      })
    }
  )
}

module.exports = {
  upImg,
  delImg,
}
```

