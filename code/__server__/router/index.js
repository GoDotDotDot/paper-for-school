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
var logger = log4js.getLogger('school')

const renderPage = (res, page) => {
  logger.info('访问' + page)
  res.set({
    'Content-Type': 'text/html'
  })
  res.status(200).send(page)
}
router.use('/students', auth.studentsRouterAuth, students)
router.use('/teachers', auth.teachersRouterAuth, teachers)
router.get('/reset', (req, res) => {
  renderPage(res, resetPage)
})
router.get('/login', (req, res) => {
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
