const express = require('express')
const bodyParser = require('body-parser')


const app = express()

// 配置body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const userRouter = require('./routes/user') // 用户
const articlesRouter = require('./routes/articles') // 文章
const catesRouter = require('./routes/cates') // 分类
const tagsRouter = require('./routes/tags') // 标签
const archRouter = require('./routes/archs') // 归档

app.use('/user', userRouter)
app.use('/articles', articlesRouter)
app.use('/cates', catesRouter)
app.use('/tags', tagsRouter)
app.use('/archs', archRouter)

app.listen(3000, () => {
  console.log('server is running')
})
