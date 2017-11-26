const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const myselecttionPage = fs.readFileSync(path.join(__dirname, '../../view/students/actionmanager/myselection.html'))
const selectPage = fs.readFileSync(path.join(__dirname, '../../view/students/actionmanager/select.html'))
const indexPage = fs.readFileSync(path.join(__dirname, '../../view/students/index.html'))

const renderPage = (res, page) => {
  res.set({
    'Content-Type': 'text/html'
  })
  res.status(200).send(page)
}
router.get('/index', (req, res) => {
  renderPage(res, indexPage)
})
router.get('/actionmanager/myselection', (req, res) => {
  renderPage(res, myselecttionPage)
})
router.get('/actionmanager/select', (req, res) => {
  renderPage(res, selectPage)
})
module.exports = router
