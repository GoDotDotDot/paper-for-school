const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const indexPage = fs.readFileSync(path.join(__dirname, '../../view/teachers/index.html'))

const publishPage = fs.readFileSync(path.join(__dirname, '../../view/teachers/actionmanager/publish.html'))
const exportPage = fs.readFileSync(path.join(__dirname, '../../view/teachers/actionmanager/export.html'))
const statusPage = fs.readFileSync(path.join(__dirname, '../../view/teachers/actionmanager/status.html'))
const addpaperPage = fs.readFileSync(path.join(__dirname, '../../view/teachers/papermanager/addpaper.html'))
const mypaperPage = fs.readFileSync(path.join(__dirname, '../../view/teachers/papermanager/mypaper.html'))
const addstuPage = fs.readFileSync(path.join(__dirname, '../../view/teachers/stumanager/addstu.html'))
const mystuPage = fs.readFileSync(path.join(__dirname, '../../view/teachers/stumanager/mystu.html'))

const renderPage = (res, page) => {
  res.set({
    'Content-Type': 'text/html'
  })
  res.status(200).send(page)
}
// teachers/actionmanager/status/
router.get('/index', (req, res) => {
  renderPage(res, indexPage)
})
router.get('/actionmanager/publish', (req, res) => {
  renderPage(res, publishPage)
})
router.get('/actionmanager/export', (req, res) => {
  renderPage(res, exportPage)
})
router.get('/actionmanager/status', (req, res) => {
  renderPage(res, statusPage)
})
router.get('/papermanager/addpaper', (req, res) => {
  renderPage(res, addpaperPage)
})
router.get('/papermanager/mypaper', (req, res) => {
  renderPage(res, mypaperPage)
})
router.get('/stumanager/addstu', (req, res) => {
  renderPage(res, addstuPage)
})
router.get('/stumanager/mystu', (req, res) => {
  renderPage(res, mystuPage)
})
module.exports = router
