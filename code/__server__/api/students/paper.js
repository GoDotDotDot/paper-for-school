const express = require('express')
const router = express.Router()
const students = require('../../model/students/index')

router.get('/status', (req, res) => {
  students.getActionStatus(req, res)
})

module.exports = router
