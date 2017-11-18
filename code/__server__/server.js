var express = require('express')
var app = express()
const bodyParser = require('body-parser')// 解析body字段模块
const port = parseInt(process.env.PORT, 10) || 3010
var api = require('./api')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // 调用bodyParser模块以便程序正确解析body传入值
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

app.use('/api', api)
app.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
