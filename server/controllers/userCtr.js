// ---------------------- 用户相关操作 -----------------------

const query = require('../libs/mysql')
// 引入jwt
const jwt = require('../libs/jwt')
// md5
const md5 = require('md5')
const md5Key = '随便写点什么'


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
/*
SELECT
	COUNT(*) num,
	"分类" title,
	"cate" name 
FROM
	(
	SELECT
		c.id,
		c.title,
		COUNT( c.id ) num 
	FROM
		cates c
		JOIN art_cate_fk ac ON ac.cate_id = c.id
		JOIN arts a ON a.id = ac.art_id 
	WHERE
		a.is_show = 1 
	GROUP BY
		c.id 
  ) t
  
SELECT
	COUNT(*) num,
	"标签" title,
	"tag" name 
FROM
	(
	SELECT
		tg.id,
		tg.title,
		COUNT( tg.id ) num 
	FROM
		tags tg
		JOIN art_tag_fk ac ON ac.tag_id = tg.id
		JOIN arts a ON a.id = ac.art_id 
	WHERE
		a.is_show = 1 
	GROUP BY
		tg.id 
	) t
*/
const getUserInfo = async (req, res) => {

  const cateSql = `SELECT
                    COUNT(*) num,
                    "分类" title,
                    "cate" name 
                  FROM
                    (
                    SELECT
                      c.id,
                      c.title,
                      COUNT( c.id ) num 
                    FROM
                      cates c
                      JOIN art_cate_fk ac ON ac.cate_id = c.id
                      JOIN arts a ON a.id = ac.art_id 
                    WHERE
                      a.is_show = 1 
                    GROUP BY
                      c.id 
                    ) t`
  const artNums = await getNums('SELECT COUNT(id) num, "日志" title, "arch" name FROM arts WHERE is_show = 1;')
  const cateNums = await getNums(cateSql)
  const tagNums = await getNums('SELECT COUNT(id) num, "标签" title, "tag" name FROM tags;')
  const links = await getLinks()
  const sql = 'SELECT id, name, userimg, `desc` FROM user;'
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
/**
 * 登录操作
 */
const login = (req, res) => {
  const username = req.body.username
  const password = md5(req.body.password + md5Key)
  console.log(password)
  const sql = `SELECT * FROM user WHERE name=? AND password = ?;`
  query(sql, [username, password], (err, data) => {
    if (err) {
      return res.json({
        status: 0,
        err
      })
    }
    if (!data.length) {
      return res.json({
        status: -1,
        msg: '用户名或密码错误'
      })
    }
    const token = jwt.createToken(username, password)
    res.json({
      status: 1,
      token,
      data
    })
  })
}

// --------------------- put操作部分 ---------------------
/**
 * 更改用户信息
 */
/*
UPDATE user SET name = 'tohere', password = '12345', `desc` = '明天', userimg = 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1667994205,255365672&fm=5' WHERE id = 1
*/
const updateUserInfo = (req, res) => {
  // 用户id
  const id = Number(req.body.id)
  const userimg = req.body.url
  const username = req.body.username
  const password = md5(req.body.password + md5Key)
  const desc = req.body.desc
  const sql = "UPDATE user SET name = ?, password = ?, `desc` = ?, userimg = ? WHERE id = ?;"
  query(sql, [username, password, desc, userimg, id], (err, data) => {
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
  getUserInfo,
  login,
  updateUserInfo
}
