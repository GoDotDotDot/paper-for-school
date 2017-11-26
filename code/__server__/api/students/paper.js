const express = require('express')
const router = express.Router()
const students = require('../../model/students/index')

router.get('/status', (req, res) => {
  students.getActionStatus(req, res)
})
router.get('/result', async(req, res) => {
  const {account, grade, master} = req.session.userInfo
  const rst = await students.queryPaperByStu(account, grade, master)
  res.status(200).json(rst)
})
module.exports = router
