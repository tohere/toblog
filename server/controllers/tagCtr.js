// --------------------- 关键词相关操作 ---------------------

const query = require('../libs/mysql')

/**
 * 获取所有关键词
 */
const getAllTags = (req, res) => {
  const sql = `SELECT * FROM tags;`
  query(sql, [], (err, data) => {
    console.log(data)
    if (err) {
      return res.json({
        status: 0,
        data
      })
    }
    res.json({
      status: 1,
      data
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
        data
      })
    }
    res.json({
      status: 1,
      tags: data[0].tags
    })
  })
}

module.exports = {
  getAllTags,
  getOneArtTags
}
