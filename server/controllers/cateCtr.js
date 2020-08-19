// --------------------- 分类操作 ---------------------

const query = require('../libs/mysql')

/**
 * 通过分类id查询文章数量
 */
function getNums (id) {
  const sql = `SELECT COUNT(*) nums FROM art_cate_fk WHERE cate_id = ?;`
  return new Promise((resolve, reject) => {
    query(sql, [id], (err, data) => {
      if (err) {
        resolve(err)
      }
      resolve(data)
    })
  })
}

/*
SELECT
	c.*,
	COUNT( c.id ) AS num 
FROM
	cates c,
	art_cate_fk ac 
WHERE
	c.id = ac.cate_id 
GROUP BY(c.id)
*/

// 查询分类详情
const getAllCates = (req, res) => {
  const sql = `SELECT
                  c.*,
                  COUNT( c.id ) AS num 
                FROM
                  cates c,
                  art_cate_fk ac 
                WHERE
                  c.id = ac.cate_id 
                GROUP BY(c.id)`
  query(sql, [], (err, cates) => {
    if (err) {
      return res.json({
        status: 0,
        err
      })
    }
    res.json({
      status: 1,
      cates
    })
  })
}

/**
 * 通过id查询该分类下的文章对应的年份
 */
function getY (id) {
  const sql = `
              SELECT
                DISTINCT DATE_FORMAT(pub_time,'%Y') year
              FROM
                arts a,
                ( SELECT * FROM art_cate_fk WHERE cate_id = ? ) temp 
              WHERE
                a.id = temp.art_id 
              ORDER BY
                year DESC 
              `
  return new Promise((resolve, reject) => {
    query(sql, [id], (err, data) => {
      if (err) {
        resolve(err)
      }
      resolve(data)
    })
  })
}

/*
SELECT
	a.id,
	a.title,
	DATE_FORMAT( pub_time, '%Y' ) AS y,
	DATE_FORMAT( pub_time, '%m-%d' ) AS publishTime
FROM
	arts a,
	( SELECT * FROM art_cate_fk WHERE cate_id = 1 ) temp 
WHERE
	a.id = temp.art_id 
ORDER BY
	a.pub_time DESC 
	LIMIT 0,2
*/
/**
 * 通过id查找对应分类的文章
 */
const getArtsByCateId = async (req, res) => {
  const id = Number(req.query.id)
  const page = Number(req.query.page) - 1
  const pageSize = Number(req.query.pageSize)
  const nums = await getNums(id)
  const years = await getY(id)
  const sql = `
              SELECT
                a.id,
                a.title,
                DATE_FORMAT( pub_time, '%Y' ) AS year,
                DATE_FORMAT( pub_time, '%m-%d' ) AS publishTime
              FROM
                arts a,
                ( SELECT * FROM art_cate_fk WHERE cate_id = ? ) temp 
              WHERE
                a.id = temp.art_id 
              ORDER BY
                a.pub_time DESC 
                LIMIT ?, ?
              `
  query(sql, [id, page * pageSize, pageSize], (err, arts) => {
    if (err) {
      return res.json({
        status: 0,
        err
      })
    }
    res.json({
      status: 1,
      total: nums[0].nums,
      years,
      arts
    })
  })
}

module.exports = {
  getAllCates,
  getArtsByCateId
}