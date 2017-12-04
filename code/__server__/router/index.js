const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const loginPage = fs.readFileSync(path.join(__dirname, '../view/login.html'))
const resetPage = fs.readFileSync(path.join(__dirname, '../view/reset.html'))
const students = require('./students')
const teachers = require('./teachers')
const log4js = require('log4js')
const auth = require('../auth')
var logger = log4js.getLogger('info')

const renderPage = (res, page) => {
  res.set({
    'Content-Type': 'text/html'
  })
  res.status(200).send(page)
}
router.use('/students', auth.studentsRouterAuth, students)
router.use('/teachers', auth.teachersRouterAuth, teachers)
router.get('/reset', (req, res) => {
  logger.info('访问密码重置页面')
  renderPage(res, resetPage)
})
router.get('/login', (req, res) => {
  logger.info('访问登录页面')
  renderPage(res, loginPage)
})
router.get('/', auth.sessionRouterAuth, (req, res) => {
  const {userInfo} = req.session
  const {role} = userInfo
  if (role === 1) {
    res.redirect('/students/index')
  } else if (role === 2) {
    res.redirect('/teachers/index')
  }
})
module.exports = router
