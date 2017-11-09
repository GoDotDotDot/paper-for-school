const jwt = require('jsonwebtoken')
const config = require('../db_config/config')
const Sessions = require('../models/sessions')

const SessionAuth = (req, res, next) => {
  // 检查设备，是否是非浏览器请求
  const {d} = req.query
  if (d === 'm') {
    // 移动终端需要带上d=m请求
    const {token} = req.query
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        const statusCode = 401
        res.status(statusCode).json({statusCode, message: err.message, status: false})
        return false
      } else {
        // 对token做解码
        const {sId} = decoded
        Sessions.findOne({_id: sId}).then(session => {
          if (!session) {
            const statusCode = 401
            res.status(statusCode).json({statusCode, message: '未登录', status: false})
          } else {
            const {expires} = session
            if (expires > new Date()) next()
            else {
              const statusCode = 401
              res.status(statusCode).json({statusCode, message: '登录过期，请重新登录', status: false})
            }
          }
        }).catch(err => console.log(err))
      }
    })
  } else {
    // 浏览器请求，只需要判断session
    if (req.session.userInfo)next()
    else {
      const statusCode = 401
      res.status(statusCode).json({statusCode, message: '未登录', status: false})
    }
  }
}

module.exports = SessionAuth
