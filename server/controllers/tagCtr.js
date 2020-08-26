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
                  tags t
                ORDER BY
                  id DESC
                 ;`
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

function getIds(id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT tag_id tagId FROM art_tag_fk WHERE art_id = ?;`
    query(sql, [id], (err, data) => {
      if (err) {
        resolve({
          status: 0,
          err,
        })
      }
      resolve({
        status: 1,
        data,
      })
    })
  })
}
/**
 * 通过文章id获取对应关键词ids
 */
/*
SELECT tag_id tagId FROM art_tag_fk WHERE art_id = 59
*/
const getTagIdsByArtId = (req, res) => {
  const artId = Number(req.query.id)
  getIds(artId)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      throw Error(err)
    })
}

// --------------------- post操作部分 ---------------------
/**
 * 添加新关键词
 */
/*
INSERT INTO	tags(title) VALUES('新关键词')
*/
const addTag = (req, res) => {
  const tag = req.body.title
  if (!tag) {
    return res.json({
      status: 0,
      err: '关键词不能为空',
    })
  }
  const sql = `INSERT INTO	tags(title) VALUES(?);`
  query(sql, [tag], (err, data) => {
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
 * 建立文章和关键词id的关系，即插入数据到art_tag_fk表中
 */
const addArtTagFK = (req, res) => {
  const artId = Number(req.body.artId)
  const tags = req.body.tags
  const sql = `INSERT INTO art_tag_fk(art_id, tag_id) VALUES ?;`
  const arr = []
  tags.forEach((tag) => {
    arr.push([artId, Number(tag.id)])
  })
  query(sql, [arr], (err, data) => {
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

/**
 * 通过文章id删除art_tag_fk中对应字段
 */
/*
DELETE FROM art_tag_fk WHERE id in (65,66,67)
*/
const delIds = (req, res) => {
  const id = Number(req.body.id)
  const sql = `DELETE FROM art_tag_fk WHERE tag_id in (?)`
  query(sql, [id], (err, data) => {
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
  delTagById,
  addTag,
  addArtTagFK,
  getTagIdsByArtId,
  delIds,
}
