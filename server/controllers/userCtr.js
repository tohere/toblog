// ---------------------- 用户相关操作 -----------------------

const query = require('../libs/mysql')

/**
 * 获取总数
 */
function getNums(sql) {
  return new Promise((resolve, reject) => {
    query(sql, [], (err, data) => {
      if (err) {
        resolve(err)
      }
      resolve(data)
    })
  })
}

function getLinks () {
  const sql = 'SELECT * FROM friendly;'
  return new Promise((resolve, reject) => {
    query(sql, [], (err, data) => {
      if (err) {
        resolve(err)
      }
      resolve(data)
    })
  })
}



/**
 * 获取用户信息
 */
const getUserInfo = async (req, res) => {
  const artNums = await getNums('SELECT COUNT(id) num, "日志" title, "arch" name FROM arts WHERE is_show = 1;')
  const cateNums = await getNums('SELECT COUNT(id) num, "分类" title, "cate" name FROM cates;')
  const tagNums = await getNums('SELECT COUNT(id) num, "标签" title, "tag" name FROM tags;')
  const links = await getLinks()
  const sql = 'SELECT * FROM user;'
  query(sql, [], (err, userInfo) => {
    if (err) {
      return res.json({
        status: 0,
        err,
      })
    }
    res.json({
      status: 1,
      data: {
        userInfo: userInfo[0],
        statistics: [
          artNums[0],
          cateNums[0],
          tagNums[0],
        ],
        links
      },
    })
  })
}

module.exports = {
  getUserInfo,
}
