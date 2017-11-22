const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const pool = require('../../model/dbpool')

// 该路由使用的中间件
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
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
      if (err) throw err
      if (rst.length === 1) {
        const serverPsw = rst[0].password
        bcrypt.compare(password, serverPsw).then((_res) => {
          if (_res) {
            const user = rst[0]
            const token = jwt.sign({ name: user.name, account: user.account || user.stuNum, sId: req.sessionID }, 'cuitcuit', {
              expiresIn: '7d'
            })
            req.session.userInfo = {master: user._master || null, grade: user.grade || null, role: user.role, name: user.name, account: user.account || user.stuNum}
            req.session.token = token
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
    if (rst.length === 1) {
      const serverPsw = rst[0].password
      bcrypt.compare(password, serverPsw).then((_res) => {
        if (_res) {
          const user = rst[0]
          const token = jwt.sign({ name: user.name, account: user.account || user.stuNum, sId: req.sessionID }, 'cuitcuit', {
            expiresIn: '7d'
          })
          req.session.userInfo = {role: user.role, name: user.name, account: user.account || user.stuNum}
          req.session.token = token
          res.status(200).json({success: true, message: '密码正确', data: {token, name: user.name, account: user.account || user.stuNum, roleName: user.role}})
        } else {
          res.status(200).json({success: false, message: '密码错误'})
        }
      }).catch((err) => {
        throw err
      })
    }
  })
})
  // 注销路由
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    // cannot access session here
    if (err) {
      res.end(err)
    } else {
      res.end('log out')
    }
  })
})
// 注册
router.post('/register', (req, res) => {
  const {account, password, role} = req.body
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
          const sql = `insert into ${role} (account,password) values (${pool.escape(account)},'${hash}')`
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
module.exports = router
