// ---------------------- 用户相关操作 -----------------------

const query = require('../libs/mysql')

// --------------------- get操作部分 ---------------------

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
// SELECT COUNT(c.id) num, "分类" title, "cate" name FROM cates c JOIN art_cate_fk ac on c.id=ac.cate_id JOIN arts a on a.id = ac.art_id WHERE a.is_show=1;
// SELECT COUNT(t.id) num, "标签" title, "tag" name FROM tags t JOIN art_tag_fk ag ON t.id = ag.tag_id JOIN arts a ON a.id = ag.art_id WHERE a.is_show = 1;
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

// --------------------- post操作部分 ---------------------
// --------------------- put操作部分 ---------------------
// --------------------- delete操作部分 ---------------------

module.exports = {
  getUserInfo,
}
