//   logger.info('访问学生首页')
const log4js = require('log4js')
var logger = log4js.getLogger('info')
const studentsRouterAuth = (req, res, next) => {
  const {userInfo} = req.session
  if (!userInfo || userInfo.role !== 1) {
    return res.redirect('/login')
  }
  logger.info(`${userInfo.account}-${userInfo.name}访问${req.path}`)
  next()
}
const teachersRouterAuth = (req, res, next) => {
  const {userInfo} = req.session
  if (!userInfo || userInfo.role !== 2) {
    return res.redirect('/login')
  }
  logger.info(`${userInfo.account}-${userInfo.name}访问${req.path}`)
  next()
}
const sessionRouterAuth = (req, res, next) => {
  const {userInfo} = req.session
  if (!userInfo) {
    return res.redirect('/login')
  }
  next()
}
const sessionApiAtuh = (req, res, next) => {
  const {userInfo} = req.session
  if (!userInfo) {
    return res.status(200).json({success: false, message: '未登录，请重新登录'})
  }
  next()
}
const studentsApiAtuh = (req, res, next) => {
  try {
    const {userInfo} = req.session
    const {role} = userInfo
    if (role !== 1) {
      return res.status(200).json({success: false, message: '你不具有该权限'})
    }
    next()
  } catch (err) {
    console.log(err)
  }
}
const teachersApiAtuh = (req, res, next) => {
  try {
    const {userInfo} = req.session
    const {role} = userInfo
    if (role !== 2) {
      return res.status(200).json({success: false, message: '你不具有该权限'})
    }
    next()
  } catch (err) {
    console.log(err)
  }
}
exports.studentsRouterAuth = studentsRouterAuth
exports.teachersRouterAuth = teachersRouterAuth
exports.sessionRouterAuth = sessionRouterAuth
exports.sessionApiAtuh = sessionApiAtuh
exports.studentsApiAtuh = studentsApiAtuh
exports.teachersApiAtuh = teachersApiAtuh
