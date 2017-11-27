const express = require('express')
const router = express.Router()
const path = require('path')
var multer = require('multer')
// const xlsx = require('node-xlsx')
// var upload = multer({ dest: 'uploads/' })
const {importPaper, importPaperFormForm, pool} = require('../../model/paper')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: function (req, file, cb) {
    var fileFormat = file.originalname.split('.')
    cb(null, fileFormat[fileFormat.length - 2] + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

var upload = multer({ storage: storage }).single('file')
router.post('/paper/upload', (req, res) => {
  let _req = req
  upload(req, res, async(err) => {
    if (err) {
      res.status(500).send({ok: false})
      return false
    }
    // console.log(_req)
    const xlsxPath = _req.file.path
    _req = null
    const rst = await importPaper(xlsxPath).then(rst => rst).catch(err => {
      // console.log(err)
      res.status(500).send({ok: false, message: '请检查excel表格是否有未填项目'})
    })
    // const workSheetsFromFile = xlsx.parse(xlsxPath)
    rst && res.send({ok: true})
  })
})
router.post('/paper/form', async(req, res) => {
  const {grade, master, teacher, gender, professional, title, from, type, hasAction, brief, require, achieve, conformity, degree, workload, stuNum, stuName} = req.body
  const sql1 = `INSERT INTO paper (grade,_master,teacher,gender,professional,title,_from,type,hasAction,brief,_require,achieve,conformity,degree,workload,stuNum,stuName)
  VALUES (TRIM('${grade}'),TRIM('${master}'),TRIM('${teacher}'),TRIM('${gender}'),TRIM('${professional}'),TRIM('${title}'),TRIM('${from}'),TRIM('${type}'),TRIM('${hasAction}'),'${brief}','${require}','${achieve}',TRIM('${conformity}'),TRIM('${degree}'),'${workload}',${stuNum ? "TRIM('" + stuNum + "')" : 'NULL'}),${stuName ? 'TRIM("' + stuName + '")' : 'NULL'}`
  const sql2 = `INSERT INTO paper (grade,_master,teacher,gender,professional,title,_from,type,hasAction,brief,_require,achieve,conformity,degree,workload)
  VALUES (${grade},'${master}','${teacher}','${gender}','${professional}','${title}','${from}','${type}','${hasAction}','${brief}','${require}','${achieve}','${conformity}','${degree}','${workload}')`
  let sql
  if (from !== '学生自拟') sql = sql2
  else sql = sql1
  const rst = await importPaperFormForm(sql).then(rst => rst).catch(err => {
    // console.log(err)
    res.status(500).send({ok: false, message: '请检查excel表格是否有未填项目'})
  })
  rst && res.send({ok: true})
})

router.get('/paper', (req, res) => {
  // const {grade, master, teacher, title} = req.query
  const grade = req.query.grade || ''
  const master = req.query.master || ''
  const teacher = req.query.teacher || ''
  const title = req.query.title || ''
  const sql = `SELECT * FROM paper where grade LIKE '%${grade}%' AND _master LIKE '%${master}%'
  AND teacher LIKE '%${teacher}%' AND title LIKE '%${title}%' AND isDelete = 0`
  // const sql = `SELECT teacher,gender,professional,title,_from,type,hasAction,brief,_require`
  pool.queryPromise(sql).then(rst => {
    // console.log(rst)
    res.status(200).json({success: true, data: rst.results})
  }).catch(err => {
    console.log(err)
    res.status(500).json({success: false, message: err.message})
  })
})
router.get('/paper/byId', (req, res) => {
  const {id} = req.query
  const sql = `SELECT * FROM paper WHERE id = ${id}`
  pool.queryPromise(sql)
  .then(rst => {
    // console.log(rst)
    res.status(200).json({success: true, data: rst.results})
  })
  .catch(err => {
    res.status(500).json({success: false, message: err.message})
  })
})
router.post('/paper/delete', (req, res) => {
  const {id} = req.body
  const sql = `UPDATE paper SET isDelete = 1 WHERE id in ( ${id.join(',')});`
  pool.queryPromise(sql)
  .then(rst => {
    // console.log(rst)
    res.status(200).json({success: true, message: '删除成功！'})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({success: false, message: err.message})
  })
})

router.post('/paper/update', async(req, res) => {
  const {id, grade, _master, teacher, gender, professional, title, _from, type, hasAction, brief, _require, achieve, conformity, degree, workload, stuNum, stuName} = req.body
  let sql
  if (_from === '学生自拟') {
    sql = `UPDATE paper SET 
    grade = TRIM('${grade}'),
     _master = TRIM('${_master}'),
    teacher = TRIM('${teacher}'),
    gender = TRIM('${gender}'),
    professional = TRIM('${professional}'),
    title = TRIM('${title}'),
    _from = TRIM('${_from}'),
    type = TRIM('${type}'),
    hasAction = TRIM('${hasAction}'),
    brief =  '${brief}',
    _require = '${_require}',
    achieve = '${achieve}',
    conformity = TRIM('${conformity}'),
    degree = TRIM('${degree}'),
    workload = TRIM('${workload}'),
    stuNum =  ${stuNum ? "TRIM('" + stuNum + "')" : 'NULL'}),
    stuName = ${stuName ? "TRIM('" + stuName + "')" : 'NULL'})
    WHERE id = ${id}`
  } else {
    sql = `UPDATE paper SET 
    grade = TRIM('${grade}'),
     _master = TRIM('${_master}'),
    teacher = TRIM('${teacher}'),
    gender = TRIM('${gender}'),
    professional = TRIM('${professional}'),
    title = TRIM('${title}'),
    _from = TRIM('${_from}'),
    type = TRIM('${type}'),
    hasAction = TRIM('${hasAction}'),
    brief =  '${brief}',
    _require = '${_require}',
    achieve = '${achieve}',
    conformity = TRIM('${conformity}'),
    degree = TRIM('${degree}'),
    workload = TRIM('${workload}'),
    stuNum =  'NULL',
    stuName = 'NULL'
    WHERE id = ${id}`
  }
  pool.queryPromise(sql)
  .then(rst => {
    // console.log(rst)
    res.status(200).json({success: true, message: '编辑成功！'})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({success: false, message: err.message})
  })
})
module.exports = router
