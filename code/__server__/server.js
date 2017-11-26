const express = require('express')
const path = require('path')
const compression = require('compression')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io').listen(server, { transports: ['polling', 'websocket'] })
const stuWS = require('./ws/gisWS')
const api = require('./api')

const bodyParser = require('body-parser')// 解析body字段模块
const port = parseInt(process.env.PORT, 10) || 80
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const dbconfig = require('./db.config')
const web_router = require('./router')
// log4js --start--
var log4js = require('log4js')
log4js.configure({
  appenders: {
    all: { type: 'file', filename: 'school.log' },
    error: { type: 'console' },
    info: {type: 'console'}
  },
  categories: {
    all: { appenders: ['all'], level: 'all' },
    error: { appenders: ['error'], level: 'error' },
    info: { appenders: ['info'], level: 'info' },
    default: { appenders: ['all', 'error'], level: 'all' }
  }
})
// logger.setLevel('INFO')
var allLogger = log4js.getLogger('all')
var errorLogger = log4js.getLogger('error')
// var infoLogger = log4js.getLogger('info')
// gzip
app.use(compression())

app.use(log4js.connectLogger(errorLogger))
// app.use(log4js.connectLogger(infoLogger))
app.use(log4js.connectLogger(allLogger))

// log4js --end--
const sessionStore = new MySQLStore(dbconfig)
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
// app.use('*', (req, res, next) => {
  //   // res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ')
  //   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  //   res.header('Access-Control-Allow-Credentials', true)

  //   next()
  // })

app.use('/_next', express.static(path.join(__dirname, 'view', '_next')))
app.use('/static', express.static(path.join(__dirname, 'view', 'static')))
app.use('/download', express.static(path.join(__dirname, 'download')))
app.use('/api', api)
app.use('/', web_router)

// ws
// stuWS.selectPaper(io)
server.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
// const io = require('socket.io')(server, {origins: '*:*', handshake: {xdomain: true}, 'transports': ['websocket']})
