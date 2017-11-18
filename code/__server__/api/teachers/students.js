const express = require('express')
const router = express.Router()
const path = require('path')
var multer = require('multer')
// const xlsx = require('node-xlsx')
// var upload = multer({ dest: 'uploads/' })
const {getSql, pool} = require('../../model/students')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/students/'))
  },
  filename: function (req, file, cb) {
    var fileFormat = file.originalname.split('.')
    cb(null, fileFormat[fileFormat.length - 2] + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

var upload = multer({ storage: storage }).single('file')
router.post('/students/upload', (req, res) => {
  let _req = req
  upload(req, res, async(err) => {
    if (err) {
      res.status(500).send({ok: false})
      return false
    }
    console.log(_req)
    const xlsxPath = _req.file.path
    _req = null
    const sql = getSql(xlsxPath)
    const rst = await pool.queryPromise(sql).then(rst => rst).catch(err => {
      console.log(err)
      res.status(500).send({ok: false, message: '请检查excel表格是否有未填项目'})
    })
    // const workSheetsFromFile = xlsx.parse(xlsxPath)
    rst && res.send({ok: true})
  })
})
router.post('/students/form', async(req, res) => {
  const {stuNum, name, grade, gender, master} = req.body
  const sql = `INSERT INTO students (stuNum, name, grade, gender,class,_master)
  VALUES (${stuNum},'${name}',${grade},'${gender}','${req.body.class}','${master}')`
  const rst = await pool.queryPromise(sql).then(rst => rst).catch(err => {
    console.log(err)
    res.status(500).send({ok: false, message: '发生了一点错误'})
  })
  rst && res.send({ok: true})
})
module.exports = router
