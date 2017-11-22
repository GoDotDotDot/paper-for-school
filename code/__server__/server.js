var express = require('express')
var app = express()
var http = require('http')
const server = http.createServer(app)
const io = require('socket.io').listen(server, {transports: ['polling', 'websocket']})
const stuWS = require('./ws/gisWS')
const bodyParser = require('body-parser')// 解析body字段模块
const port = parseInt(process.env.PORT, 10) || 3010
const session = require('express-session')
var MySQLStore = require('express-mysql-session')(session)
const dbconfig = require('./db.config')

var api = require('./api')

var sessionStore = new MySQLStore(dbconfig)
const sessionMiddleWare = session({
  key: 'chukuiSessionId',
  secret: 'cuitcuit',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
})
app.use(sessionMiddleWare)
stuWS.selectPaper(io, sessionMiddleWare)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // 调用bodyParser模块以便程序正确解析body传入值
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)

  next()
})

app.use('/api', api)
// ws
// stuWS.selectPaper(io)
server.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
// var io = require('socket.io')(server, {origins: '*:*', handshake: {xdomain: true}, 'transports': ['websocket']})
