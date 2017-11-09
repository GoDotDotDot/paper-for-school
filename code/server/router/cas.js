const express = require('express')
const router = express.Router()
const SessionAuth = require('../cas/SessionAuth')
const SourceAuth = require('../cas/SourceAuth')
const PermissionAuth = require('../cas/PermissionAuth')
const jwt = require('jsonwebtoken')
const config = require('../db_config/config')

let start = Date.now()
let end = Date.now()
router.use(function timeLog (req, res, next) {
  start = Date.now()
  console.log('Time: ', start)
  next()
})

router.get('/auth',
  SessionAuth, // 登录验证
  // 验证类型，路由无需检查token，api必须检查
// (req, res, next) => {
//   const {type, token} = req.query
//   if (type !== 'router') {
//     // const _token = req.session.token
//     jwt.verify(token, config.secret, function (err, decoded) {
//       if (err) {
//         const statusCode = 401
//         res.status(statusCode).json({statusCode, message: err.message, status: false})
//         return false
//       } else {
//         next()
//       }
//       // decoded undefined
//     })
//   } else {
//     next()
//   }
// },
// 资源与权限验证
async(req, res, next) => {
  const source = await SourceAuth(req, res, next)
  if (source.status === 404) {
    end = Date.now()
    res.status(404).json({statusCode: 404, message: '资源不存在', status: false, time: end - start})
  } else if (source.status === 200) {
    const {role} = req.session.userInfo
    const {action} = req.query
    const permission = await PermissionAuth(source, action, role)
    if (!permission) {
      end = Date.now()
      res.status(401).json({statusCode: 401, message: '权限验证未通过', status: false, time: end - start})
    } else {
      end = Date.now()
      res.status(200).json({statusCode: 200, message: '验证通过', status: true, time: end - start})
    }
  }
})
module.exports = router
