const express = require('express')
const router = express.Router()
const format = require('date-fns/format')
var compareAsc = require('date-fns/compare_asc')
var schedule = require('node-schedule')
var date = new Date(2012, 11, 21, 5, 30, 0)
const students = require('../../model/students/index')
const gisWSNSP = require('../../ws/gisWS').getNSP()
const {pool} = require('../../model/paper')

router.post('/action/publish', (req, res) => {
  const {grade, _master} = req.body
  if (req.body.startTime >= req.body.endtTime) {
    res.status(500).json({success: false, message: '请检查表单'})
    return false
  }
  let startTime = format(req.body.startTime, 'YYYY-MM-DD HH:mm:ss')
  let endTime = format(req.body.endTime, 'YYYY-MM-DD HH:mm:ss')
  const authPaperSql = `SELECT * FROM paper WHERE grade = TRIM('${grade}') AND _master = TRIM('${_master}') AND isDelete = 0`
  pool.queryPromise(authPaperSql)
  .then(rst => {
    if (rst.results.length > 0) {
      const sql = `INSERT INTO action (grade,_master,startTime,endTime)
        VALUES (TRIM('${grade}'),TRIM('${_master}'),'${startTime}','${endTime}')`
      pool.queryPromise(sql)
        .then(rst => {
          res.status(200).json({success: true, message: '发布成功！'})
          schedule.scheduleJob(new Date(startTime) - 10 * 60 * 1000, async () => {
            // 提前10分钟获取选课列表
            students.getPaperListWithWS(gisWSNSP)
          })
          schedule.scheduleJob(new Date(startTime) - 1000, async () => {
            // 开始抢课
            const list = await students.getPaperListWithWS()
            gisWSNSP.emit('actionStart', list)
          })
          schedule.scheduleJob(new Date(endTime), async () => {
            gisWSNSP.emit('actionEnd')
          })
        })
        .catch(err => {
          res.status(500).json({success: false, message: err.message})
        })
    } else {
      res.status(500).json({success: false, message: '请检查表单'})
    }
  })
})
// SELECT a.runoob_id, a.runoob_author, b.runoob_count
// FROM runoob_tbl a LEFT JOIN tcount_tbl b ON a.runoob_author = b.runoob_author
router.get('/action/status', (req, res) => {
  const now = Date.now()
  const sql = `SELECT a.id, a.startTime, a.endTime, a._master, a.grade,b.name FROM action a LEFT JOIN
  teachers b ON a.createBy = b.id WHERE a.grade = '2013' AND a.isDelete = 0`
  pool.queryPromise(sql)
  .then(rst => {
    const data = rst.results.map(ele => {
      const {startTime, endTime} = ele
      let status
      const before = compareAsc(now, startTime)
      const after = compareAsc(now, endTime)
      if (before === -1) {
        status = '未开始'
      } else if (before >= 0 && after === -1) {
        status = '进行中'
      } else {
        status = '已结束'
      }
      ele.status = status
      ele.startTime = format(ele.startTime, 'YYYY-MM-DD HH:mm:ss')
      ele.endTime = format(ele.endTime, 'YYYY-MM-DD HH:mm:ss')
      return ele
    })
    res.status(200).json({success: true, data})
  })
  .catch(err => {
    res.status(500).json({success: false, message: err.message})
  })
})

router.post('/action/delete', (req, res) => {
  const {id} = req.body
  const sql = `UPDATE action SET isDelete = 1 WHERE id in ( ${id.join(',')});`
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
module.exports = router
