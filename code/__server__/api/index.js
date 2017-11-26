const express = require('express')
const router = express.Router()
const teachers = require('./teachers')
const students = require('./students')
const users = require('./users')
const auth = require('../auth')
const pool = require('../model/dbpool')

router.use('/teachers', auth.teachersApiAtuh, teachers)
router.use('/students', auth.studentsApiAtuh, students)
router.use('/users', users)
router.get('/notice/:to', (req, res) => {
  const {to} = req.params
  const sql = `SELECT content FROM notice WHERE obj = ${pool.escape(to)} LIMIT 1`
  pool.queryPromise(sql)
    .then(rst => {
      if (rst.results.length === 0) {
        return res.status(200).json({success: false, message: '暂时没有通知'})
      }
      res.status(200).json({success: true, data: rst.results[0]})
    }).catch(err => {
      res.status(500).json({success: false, message: '发生了错误'})
    })
})
module.exports = router
