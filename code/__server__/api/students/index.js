const express = require('express')
const router = express.Router()

const paper = require('./paper')

router.use('/paper', paper)

module.exports = router
