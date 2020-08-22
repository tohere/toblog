// --------------------- 关键词相关操作 ---------------------

const query = require('../libs/mysql')

// --------------------- get操作部分 ---------------------

/**
 * 获取所有关键词
 */
/*
SELECT
  t.*
FROM
  tags t
  JOIN art_tag_fk ag ON t.id = ag.tag_id
  JOIN arts a ON a.id = ag.art_id 
WHERE
  a.is_show = 1
*/
const getAllTags = (req, res) => {
  const sql = `SELECT
                  t.*
                FROM
                  tags t;`
  query(sql, [], (err, data) => {
    if (err) {
      return res.json({
        status: 0,
        data,
      })
    }
    res.json({
      status: 1,
      data,
    })
  })
}

/**
 * 查询某篇文章对应的关键词
 */

const getOneArtTags = (req, res) => {
  const artId = req.query.id
  const sql = `
              SELECT
                a.id,
                GROUP_CONCAT( t.title ) AS tags 
              FROM
                art_tag_fk atk
                JOIN tags t ON atk.tag_id = t.id
                JOIN arts a ON atk.art_id = a.id 
              WHERE
                a.id = ?
              `
  query(sql, [artId], (err, data) => {
    if (err) {
      return res.json({
        status: 0,
        data,
      })
    }
    res.json({
      status: 1,
      tags: data[0].tags,
    })
  })
}

// --------------------- post操作部分 ---------------------
// --------------------- put操作部分 ---------------------
// --------------------- delete操作部分 ---------------------
/**
 * 通过id删除标签
 */
/* 
DELETE FROM art_tag_fk WHERE tag_id = 1;
DELETE FROM tags WHERE id = 1;
*/
const delTagById = (req, res) => {
  const id = Number(req.body.id)
  const sql = `
              DELETE FROM art_tag_fk WHERE tag_id = ?;
              DELETE FROM tags WHERE id = ?;
              `
  query(sql, [id, id], (err, data) => {
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

module.exports = {
  getAllTags,
  getOneArtTags,
  delTagById
}
