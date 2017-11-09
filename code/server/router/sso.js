const express = require('express')
const router = express.Router()
// const ReactDOMServer = require('react-dom/server')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../db_config/config')
const bcrypt = require('bcrypt')
const SessionAuth = require('../cas/SessionAuth')
// const Login = require('../sso/Login')

// 该路由使用的中间件
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
  // 登录路由
router.get('/login', function (req, res) {
  const account = req.query.account
  const password = req.query.password
  User.findOne({
    account
  }, (err, user) => {
    if (err) {
      throw err
    }
    if (!user) {
      res.json({success: false, message: '认证失败,用户不存在!'})
    } else if (user) {
      // 检查密码是否正确
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign({ name: user.nickName, account: user.account, sId: req.sessionID }, config.secret, {
            expiresIn: '7d'
          })
          req.session.userInfo = {role: user.roleName, name: user.nickName, account: user.account}
          req.session.token = token
          res.status(200).json({success: true, message: '密码正确', data: {token, name: user.nickName, account: user.account, roleName: user.roleName}})
        } else {
          res.send({success: false, message: '认证失败,密码错误!'})
        }
      })
    }
  })
})
/* router.post('/login', function (req, res) {
  const account = req.body.account
  const password = req.body.password
  const querySql = `select * from jc_user where account='${account}'`
  pool.query(querySql, (err, rst, fields) => {
    if (err) throw err
    if (rst.length === 1) {
      const serverPsw = rst[0].password
      bcrypt.compare(password, serverPsw).then((_res) => {
        if (_res) {
          const user = rst[0]
          const token = jwt.sign({ name: user.nickName, account: user.account, sId: req.sessionID }, config.secret, {
            expiresIn: '7d'
          })
          req.session.userInfo = {role: user.roleName, name: user.nickName, account: user.account}
          req.session.token = token
          // const html = ReactDOMServer.renderToString(Login)
          // res.send(html)
          res.status(200).json({success: true, message: '密码正确', data: {token, name: user.nickName, account: user.account, roleName: user.roleName}})
        } else {
          res.status(200).json({success: false, message: '密码错误'})
        }
      }).catch((err) => {
        throw err
      })
    }
  })
}) */
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
// 验证是否登录
router.get('/auth', SessionAuth, (req, res, next) => {
  const statusCode = 200
  res.status(statusCode).json({statusCode, message: '已登录', status: true})
})
// 注册
router.post('/register', (req, res) => {
  const acc = req.body.account
  const psw = req.body.password
  if (!acc || !psw) {
    res.json({success: false, message: '请输入您的账号密码.'})
  } else {
    User.findOne({account: acc}).then((user) => {
      if (!user) {
        var newUser = new User({
          account: acc,
          password: psw
        })
        // 保存用户账号
        newUser.save((err) => {
          if (err) {
            return res.json({success: false, message: '注册失败!'})
          }
          res.json({success: true, message: '成功创建新用户!'})
        })
      } else {
        res.json({success: false, message: '用户已存在!'})
      }
    })
  }
  // connection.end()
})
module.exports = router
