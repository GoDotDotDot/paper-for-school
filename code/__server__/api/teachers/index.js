const express = require('express')
const router = express.Router()
const paper = require('./paper')
const students = require('./students')
const action = require('./action')
router.use('/', paper)
router.use('/', students)
router.use('/', action)

module.exports = router
