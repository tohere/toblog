// --------------------- 归档操作 ---------------------
const query = require('../libs/mysql')


// --------------------- get操作部分 ---------------------

/**
 * 查询所有年份
 */
function getY () {
  const sql = `SELECT DISTINCT DATE_FORMAT( pub_time, '%Y' ) y FROM arts ORDER BY y DESC;`
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
 * 查询文章总数
 */
function getNums () {
  const sql = `SELECT COUNT(id) total FROM  arts WHERE is_show = 1;`
  return new Promise((resolve, reject) => {
    query(sql, [], (err, data) => {
      if (err) {
        resolve(err)
      }
      resolve(data)
    })
  })
}

/*
SELECT
	id,
	title,
	pub_time,
	DATE_FORMAT( pub_time, '%Y' ) AS publishY,
	DATE_FORMAT( pub_time, '%m-%d' ) AS publishTime
FROM
	arts 
ORDER BY
	pub_time DESC
*/
const getArchs = async(req, res) => {
  let page = Number(req.query.page) - 1
  let pageSize = Number(req.query.pageSize)
  const sql = `
              SELECT
                id,
                title,
                pub_time,
                DATE_FORMAT( pub_time, '%Y' ) AS publishY,
                DATE_FORMAT( pub_time, '%m-%d' ) AS publishTime
              FROM
                arts 
                WHERE is_show = 1
              ORDER BY
                pub_time DESC
              LIMIT ?, ?
              `
  const years = await getY()
  const nums = await getNums()
  query(sql, [page * pageSize, pageSize], (err, data) => {
    if (err) {
      return res.json({
        status: 0,
        err
      })
    }
    res.json({
      status: 1,
      data:{
        total: nums[0].total,
        years,
        archs: data
      }
    })
  })
}

// --------------------- post操作部分 ---------------------
// --------------------- put操作部分 ---------------------
// --------------------- delete操作部分 ---------------------

module.exports = {
  getArchs
}
