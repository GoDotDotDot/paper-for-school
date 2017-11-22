const express = require('express')
const router = express.Router()
const teachers = require('./teachers')
const students = require('./students')
const users = require('./users')

router.use('/teachers', teachers)
router.use('/students', students)
router.use('/users', users)

module.exports = router
