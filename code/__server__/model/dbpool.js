const mysql = require('mysql')
const dbconfig = require('../db.config')
const pool = mysql.createPool({...dbconfig})

pool.queryPromise = pool.queryPromise || function (query) {
  return new Promise((resolve, reject) => {
    pool.query(query, function (error, results, fields) {
      if (error) reject(error)
      resolve({results, fields})
    })
  })
}
module.exports = pool
