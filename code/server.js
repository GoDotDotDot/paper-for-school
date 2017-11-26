const express = require('express')
const next = require('next')
require('isomorphic-fetch')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  // __server__ --start--
  var http = require('http')
  const serverIO = http.createServer(server)
  const io = require('socket.io').listen(serverIO, {transports: ['polling', 'websocket']})
  const stuWS = require('./__server__/ws/gisWS')
  const bodyParser = require('body-parser')// 解析body字段模块
  const session = require('express-session')
  const MySQLStore = require('express-mysql-session')(session)
  const dbconfig = require('./__server__/db.config')
  const api = require('./__server__/api')

  const sessionStore = new MySQLStore(dbconfig)
  const sessionMiddleWare = session({
    key: 'chukuiSessionId',
    secret: 'cuitcuit',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
// __server --end--
  server.use(sessionMiddleWare)
  stuWS.selectPaper(io, sessionMiddleWare)
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json()) // 调用bodyParser模块以便程序正确解析body传入值
  server.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', true)
    next()
  })
  server.use('/api', api)

  server.get('/login', async(req, res) => {
    app.render(req, res, '/login', req.query)
  })
  server.get('*', (req, res) => {
    // console.log('express', req.params)
    return handle(req, res)
  })

  serverIO.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
