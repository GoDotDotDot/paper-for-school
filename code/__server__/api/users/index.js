const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const pool = require('../../model/dbpool')
var log4js = require('log4js')
var infoLogger = log4js.getLogger('info')
var allLogger = log4js.getLogger('all')
const auth = require('../../auth')
  // 登录路由
router.get('/login', function (req, res) {
  const {account, password, role} = req.query
  const sql = {
    teachers: `select * from teachers where account='${account}'`,
    students: `select * from students where stuNum='${account}'`
  }
  const querySql = sql[role]
  try {
    pool.query(querySql, (err, rst, fields) => {
      if (err) {
        return res.status(200).json({success: false, message: '查询出错！'})
        // throw err
      } if (rst.length === 1) {
        const serverPsw = rst[0].password
        bcrypt.compare(password, serverPsw).then((_res) => {
          if (_res) {
            const user = rst[0]
            const token = jwt.sign({ name: user.name, account: user.account || user.stuNum, sId: req.sessionID }, 'cuitcuit', {
              expiresIn: '7d'
            })
            req.session.userInfo = {master: user._master || null, grade: user.grade || null, role: user.role, name: user.name, account: user.account || user.stuNum}
            req.session.token = token
            infoLogger.info(`${account}-${user.name}登录成功!`)
            allLogger.info(`${account}-${user.name}登录成功!`)
            res.status(200).json({success: true, message: '密码正确', data: {master: user._master || null, grade: user.grade || null, token, name: user.name, account: user.account || user.stuNum, roleName: user.role}})
          } else {
            res.status(200).json({success: false, message: '密码错误'})
          }
        }).catch((err) => {
          throw err
        })
      } else {
        res.status(200).json({success: false, message: '密码错误'})
      }
    })
  } catch (err) {
    console.log(err)
  }
})
router.post('/login', function (req, res) {
  const {account, password, role} = req.body
  const sql = {
    teachers: `select * from teachers where account='${account}'`,
    students: `select * from students where stuNum='${account}'`
  }
  const querySql = sql[role]
  pool.query(querySql, (err, rst, fields) => {
    if (err) throw err
    if (rst.length > 0) {
      const serverPsw = rst[0].password
      bcrypt.compare(password, serverPsw).then((_res) => {
        if (_res) {
          const user = rst[0]
          const token = jwt.sign({ name: user.name, account: user.account || user.stuNum, sId: req.sessionID }, 'cuitcuit', {
            expiresIn: '7d'
          })
          req.session.userInfo = {master: user._master || null, grade: user.grade || null, role: user.role, name: user.name, account: user.account || user.stuNum, id: user.id}
          req.session.token = token
          res.status(200).json({success: true, message: '密码正确', data: {master: user._master || null, grade: user.grade || null, token, name: user.name, account: user.account || user.stuNum, roleName: user.role}})
        } else {
          res.status(200).json({success: false, message: '密码错误'})
        }
      }).catch((err) => {
        throw err
      })
    } else {
      res.status(200).json({success: false, message: '用户不存在'})
    }
  })
})
  // 注销路由
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    // cannot access session here
    if (err) {
      return res.status(200).json({success: false, message: '内部错误！'})
    }
    res.status(200).json({success: true, message: '注销成功！请重新登录'})
  })
})
// 注册
router.post('/register', auth.teachersApiAtuh, (req, res) => {
  const {account, password, role, name} = req.body
  const sql = {
    teachers: `select account from teachers where account='${account}'`,
    students: `select stuNum from students where stuNum='${account}'`
  }
  const querySql = sql[role]
  pool.query(querySql, function (error, results, fields) {
    if (error) { pool.end(); throw error }
    if (results.length !== 0) res.json({success: false, message: '用户已存在!'})
    else {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          res.status(500).json({success: false, message: '服务器发生内部错误!'})
        }
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            res.status(500).json({success: false, message: '加密出错！'})
          }
          const insSql = {
            teachers: `insert into teachers (account,password,name) values (${pool.escape(account)},'${hash}','${name}')`,
            students: `insert into students (stuNum,password,name) values (${pool.escape(account)},'${hash}','${name}')`
          }
          const sql = insSql[role]
          pool.query(sql, (err, rst, fields) => {
            if (err) throw (err)
            if (rst) {
              return res.status(200).json({success: true, message: '注册成功！', data: rst})
            }
          })
        })
      })
    }
  })
  // connection.end()
})
// 学生重置密码
router.post('/reset', async (req, res) => {
  const {account, password, verify} = req.body
  const querySql = `select * from students where stuNum='${pool.escape(account)}' and verify = ${pool.escape(verify)}`
  const rst = await pool.queryPromise(querySql)
  .then(rst => {
    if (rst.results.length === 0) {
      return {success: false, message: '用户名或者验证信息错误'}
    }
    return {success: false, data: {id: rst.results[0].id}}
  })
  if (!rst.success) {
    return rst
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      res.status(500).json({success: false, message: '服务器发生内部错误!'})
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        res.status(500).json({success: false, message: '加密出错！'})
      }
      const sql = `UPDATE students SET (password = '${hash}') WHERE id = ${rst.data.id}`
      pool.query(sql, (err, rst, fields) => {
        if (err) throw (err)
        if (rst) {
          return res.status(200).json({success: true, message: '修改成功！'})
        }
      })
    })
  })
})

module.exports = router
