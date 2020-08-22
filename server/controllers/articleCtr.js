// --------------------- 文章操作 ---------------------
const query = require('../libs/mysql')


// --------------------- get操作部分 ---------------------
/*
SELECT
	a.*,
	GROUP_CONCAT( c.title ) cates
FROM
	arts a
	JOIN art_cate_fk ac ON a.id = ac.art_id
	JOIN cates c ON c.id = ac.cate_id 
GROUP BY
	a.id ASC 
ORDER BY
	istop DESC,
	pub_time DESC,
	up_time DESC
	LIMIT 0, 2
*/

/**
 * 获取文章
 */
const getArts = (req, res) => {
  const page = Number(req.query.page) - 1
  const pageSize = Number(req.query.pageSize)
  const sql = `
                SELECT
                  a.*,
                  GROUP_CONCAT( c.title ) cates
                FROM
                  arts a
                  JOIN art_cate_fk ac ON a.id = ac.art_id
                  JOIN cates c ON c.id = ac.cate_id 
                  WHERE a.is_show = 1
                GROUP BY
                  a.id ASC 
                ORDER BY
                  istop DESC,
                  pub_time DESC,
                  up_time DESC
                LIMIT ?, ?
                `
  query(sql, [page * pageSize, pageSize], (err, data) => {
    if (err) {
      return res.json({
        status: 0,
        err,
      })
    }
    res.json({
      status: 1,
      data,
    })
  })
}

function getNums (sql, params=[]) {
  return new Promise((resolve, reject) => {
    query(sql, params, (err, data) => {
      if (err) {
        resolve(err)
      }
      resolve(data)
    })
  })
}

/**
 * 获取文章总数
 */
const getArtsNum = async (req, res) => {
  const sql = `SELECT COUNT(id) AS total FROM arts WHERE is_show = 1`
  const data = await getNums(sql)
  res.json({
    status: 1,
    total: data
  })
}

/**
 * 通过文章id获取文章详情
 */
const getArtById = (req, res) => {
  const artId = req.query.id
  const sql = `SELECT
                  a.*,
                  GROUP_CONCAT(c.title) cates
                FROM
                  arts a
                  JOIN art_cate_fk ac ON a.id = ac.art_id
                  JOIN cates c ON c.id = ac.cate_id 
                WHERE
                  a.id =?;`
  query(sql, [artId], (err, data) => {
    if (err || !data[0].id) {
      return res.json({
        status: 0,
        err
      })
    }
    res.json({
      status: 1,
      data
    })
  })
}

/**
 * 根据关键词进行文章搜索
 */
/*
SELECT
	* 
FROM
	arts 
WHERE
	title LIKE '%ex%' 
	AND is_show = 1 
ORDER BY
  pub_time DESC
LIMIT 0, 1
*/
const search = async (req, res) => {
  const word = req.query.word
  const page = Number(req.query.page) - 1
  const pageSize = Number(req.query.pageSize)
  const tsql = `SELECT
                  COUNT(id) total
                FROM
                  arts 
                WHERE
                  title LIKE ?
                  AND is_show = 1 `
  const nums = await getNums(tsql, ['%' + word + '%'])
  const sql = `SELECT
                  * 
                FROM
                  arts 
                WHERE
                  title LIKE ? 
                  AND is_show = 1 
                ORDER BY
                  istop DESC,
                  pub_time DESC
                  LIMIT ?, ?`
  query(sql, ['%' + word + '%', page * pageSize, pageSize], (err, data) => {
    if (err) {
      return res.json({
        status: 0,
        err
      })
    }
    res.json({
      status: 1,
      data,
      total: nums[0].total
    })
  })
}

/**
 * 搜索已被软删除的文章is_show = 0
 */
const getRecycle = (req, res) => {
  const sql = `SELECT * FROM arts WHERE is_show = 0;`
  query(sql, [], (err, data) => {
    if (err) {
      return res.json({
        status: 0,
        err
      })
    }
    res.json({
      status: 1,
      data
    })
  })
}



// --------------------- post操作部分 ---------------------

/**
 * 添加文章
 */
const addArt = (req, res) => {
  const art = req.body
  const pub_time = Date.now()
  const sql = `INSERT INTO arts(title, content, pub_time) VALUES('${art.title}', '${art.content}', '${pub_time}');`
  query(sql, [], (err, data) => {
    console.log(data)
  })
  res.send('ok')
}



// --------------------- put操作部分 ---------------------
/**
 * 文章置顶操作
 */
/*
UPDATE arts 
SET istop = 1 
WHERE
	id =2
*/
const optTop = (req, res) => {
  const istop = Number(req.body.top)
  const artId = Number(req.body.id)
  const sql = `UPDATE arts SET istop = ? WHERE id =?;`
  query(sql, [istop, artId], (err, data) => {
    if (err) {
      return res.json({
        status: 0,
        err
      })
    }
    res.json({
      status: 1,
      data
    })
  })
}

/**
 * 文章是否显示 
 * 显示            is_show = 1
 * 不显示(软删除)  is_show = 0
 */
/*
UPDATE arts 
SET is_show = 0 
WHERE
  id = 1
*/
const setArtShow = (req, res) => {
  const id = Number(req.body.id)
  const is_show = Number(req.body.show)
  const sql = `UPDATE arts SET is_show = ? WHERE id = ?;`
  query(sql, [is_show, id], (err, data) => {
    if (err) {
      return res.json({
        status: 0,
        err
      })
    }
    res.json({
      status: 1,
      data
    })
  })
}

// --------------------- delete操作部分 ---------------------


module.exports = {
  getArts,
  getArtsNum,
  addArt,
  getArtById,
  optTop,
  setArtShow,
  search,
  getRecycle
}
