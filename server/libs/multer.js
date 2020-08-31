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
