// --------------------- 文章操作 ---------------------
const query = require('../libs/mysql')

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
  const page = req.query.page
  const pageSize = req.query.pageSize
  const sql = `
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
                LIMIT ${(page - 1) * pageSize}, ${pageSize}
                `
  query(sql, [], (err, data) => {
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

/**
 * 获取文章总数
 */
const getArtsNum = (req, res) => {
  const sql = `SELECT COUNT(id) AS total FROM arts`
  query(sql, [], (err, total) => {
    if (err) {
      return res.json({
        status: 0,
        err,
      })
    }
    res.json({
      status: 1,
      total,
    })
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
    console.log(data[0].id)
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
 * 添加文章
 */
const addArt = (req, res) => {
  const art = req.body
  const pub_time = Date.now()
  console.log(pub_time)
  const sql = `INSERT INTO arts(title, content, pub_time) VALUES('${art.title}', '${art.content}', '${pub_time}');`
  query(sql, [], (err, data) => {
    console.log(data)
  })
  res.send('ok')
}


/*
SELECT
	a.id,
	GROUP_CONCAT( t.title ) AS tags 
FROM
	art_tag_fk atk
	JOIN tags t ON atk.tag_id = t.id
	JOIN arts a ON atk.art_id = a.id 
WHERE
	a.id = 1
*/



module.exports = {
  getArts,
  getArtsNum,
  addArt,
  getArtById
}
