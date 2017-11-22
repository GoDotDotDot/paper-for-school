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

router.get('/students', (req, res) => {
  // const {grade, master, teacher, title} = req.query
  const grade = req.query.grade || ''
  const _class = req.query.class || ''
  let gender = req.query.gender || ''
  if (gender === 'all') gender = ''
  const sql = `SELECT * FROM students where grade LIKE '%${grade}%' AND class LIKE '%${_class}%'
  AND gender LIKE '%${gender}%' AND isDelete = 0`
  // const sql = `SELECT teacher,gender,professional,title,_from,type,hasAction,brief,_require`
  pool.queryPromise(sql).then(rst => {
    console.log(rst)
    res.status(200).json({success: true, data: rst.results})
  }).catch(err => {
    console.log(err)
    res.status(500).json({success: false, message: err.message})
  })
})
router.get('/students/byStuNum', (req, res) => {
  const {stuNum} = req.query
  const sql = `SELECT * FROM students WHERE stuNum = ${stuNum}`
  pool.queryPromise(sql)
  .then(rst => {
    console.log(rst)
    res.status(200).json({success: true, data: rst.results})
  })
  .catch(err => {
    res.status(500).json({success: false, message: err.message})
  })
})
router.post('/students/delete', (req, res) => {
  const {id} = req.body
  const sql = `UPDATE students SET isDelete = 1 WHERE id in ( ${id.join(',')});`
  pool.queryPromise(sql)
  .then(rst => {
    console.log(rst)
    res.status(200).json({success: true, message: '删除成功！'})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({success: false, message: err.message})
  })
})
router.post('/students/resetPsw', (req, res) => {
  const {id} = req.body
  const sql = `UPDATE students SET psw = NULL WHERE id = ${id};`
  pool.queryPromise(sql)
  .then(rst => {
    console.log(rst)
    res.status(200).json({success: true, message: '重置成功！'})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({success: false, message: err.message})
  })
})
module.exports = router
