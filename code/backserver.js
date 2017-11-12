const express = require('express')
const next = require('next')
require('isomorphic-fetch')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const Auth = async(req, res, next, route) => {
  let status = 200
  const data = await fetch(`http://cas.zzz.com/cas/auth?type=router&name=${route}&action=browse`, {
    headers: {
      Cookie: req.headers.cookie
    },
    credentials: 'same-origin'
  })
  .then(_res => {
    status = _res.status // 200 404 401 500
    if (status === 200) {
      return _res.json()
    } else if (status === 401) res.redirect('/login')
    else {
      throw Error(`CAS：${_res.statusText}`)
    }
  })
  .then(json => json)
  .catch((err) => {
    res.redirect(`/error?code=${status}&m=${err.message}`)
    return false
  })

  data && app.render(req, res, route, {...req.query, stationId: data.stationId})
}
app.prepare()

.then(() => {
  const server = express()
  server.get('/deviceControl', async(req, res, next) => {
    // Auth(req, res, next, '/deviceControl')
    // Auth(req, res, next, '/deviceControl')
    app.render(req, res, '/deviceControl', 'test')
  })
  server.get('/logs', async(req, res, next) => {
    Auth(req, res, next, '/logs')
  })
  server.get('/login', async(req, res) => {
    app.render(req, res, '/login', req.query)
  })
  server.get('*', (req, res) => {
    // console.log('express', req.params)
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
