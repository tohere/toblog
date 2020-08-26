const express = require('express')
const app = express()
// 引入body-parser
const bodyParser = require('body-parser')
// 引入cookie-parser
const cookieParser = require('cookie-parser')

const cookieV = require('./middleware/cookieV')



// 配置body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 配置cookie-parser
app.use(cookieParser())

app.use(cookieV)

// 开放静态目录
app.use(express.static('public'))

const userRouter = require('./routes/user') // 用户
const articlesRouter = require('./routes/articles') // 文章
const catesRouter = require('./routes/cates') // 分类
const tagsRouter = require('./routes/tags') // 标签
const archsRouter = require('./routes/archs') // 归档
const uploadsRouter = require('./routes/uploads') // 文件上传

app.use('/user', userRouter)
app.use('/articles', articlesRouter)
app.use('/cates', catesRouter)
app.use('/tags', tagsRouter)
app.use('/archs', archsRouter)
app.use('/files', uploadsRouter)

app.listen(3000, () => {
  console.log('server is running')
})
