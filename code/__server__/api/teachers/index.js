const express = require('express')
const router = express.Router()
const paper = require('./paper')
const students = require('./students')
router.use('/', paper)
router.use('/', students)

module.exports = router
