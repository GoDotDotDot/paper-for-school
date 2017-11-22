const express = require('express')
const router = express.Router()
const format = require('date-fns/format')
var compareAsc = require('date-fns/compare_asc')
const pool = require('../dbpool')
// const gisWSNSP = require('../../model/students/index').getNSP()

const getActionStatus = (nsp, socket, status) => {
  const now = Date.now()
  const {session} = socket.request
  const {grade, master} = session.userInfo
  const sql = `SELECT a.id, a.startTime, a.endTime, a._master, a.grade,b.name FROM action a LEFT JOIN
    teachers b ON a.createBy = b.id WHERE a.grade = ${pool.escape(grade)} AND a.isDelete = 0 LIMIT 1`
  return pool.queryPromise(sql)
    .then(rst => {
      const data = rst.results.map(ele => {
        const {startTime, endTime} = ele
        let _status = status
        if (!_status) {
          const before = compareAsc(now, startTime)
          const after = compareAsc(now, endTime)
          if (before === -1) {
            _status = '未开始'
          } else if (before >= 0 && after === -1) {
            _status = '进行中'
          } else {
            _status = '已结束'
          }
        }
        ele.status = _status
        ele.startTime = format(startTime, 'YYYY-MM-DD HH:mm:ss')
        ele.endTime = format(endTime, 'YYYY-MM-DD HH:mm:ss')
        return ele
      })
      return {success: true, data}
    })
    .catch(err => {
      return {success: false, message: err.message}
    })
}
const getPaperList = (nsp, socket) => {
  const {session} = socket.request
  const {grade, master} = session.userInfo
  const sql = `SELECT * FROM paper where grade = '${grade}' AND _master='${master}' AND isDelete = 0`
  return pool.queryPromise(sql).then(rst => {
    console.log(rst)
    return {success: true, data: rst.results}
  }).catch(err => {
    console.log(err)
    return {success: false, message: err.message}
  })
}

const selectPaper = (nsp, socket, id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject({success: false, message: '获取数据库连接失败'})
        return
      }
      connection.beginTransaction(function (err) {
        if (err) { throw err }
        connection.query(`SELECT * FROM paper WHERE id=${id}`, (err, rst) => {
          if (err) {
            reject({success: false, message: err.message})
            return
          }
          const data = rst[0]
          if (!data) {
              // 回滚 取消事物
            reject(new Error('数据库查询失败'))
            // return false
          }
          const {stuNum, stuName} = data
          if (stuNum) {
              // 学号已存在
            return connection.rollback(function () {
              reject({success: false, message: `已被学号为：${stuNum},${stuName}选择`})
            })
          }
            // 从session中获取学生学号
          const {session} = socket.request
          const {account, name} = session.userInfo
          const upSql = `UPDATE paper SET stuNum = ${connection.escape(account)},
            stuName = ${connection.escape(name)} WHERE id =${id}`
          connection.query(upSql, (err, rst) => {
            if (err) {
              reject({success: false, message: err.message})
            }
            console.log(err)
            connection.commit(function (err) {
              if (err) {
                return connection.rollback(function () {
                  reject({success: false, message: '选课失败！数据库即将回滚'})
                  throw err
                })
              }
              resolve({success: true, message: '选择成功！'})
              nsp.emit('recivePaperList')
              console.log('success!')
            })
          })
        })
      })
    })
  })
}
exports.getActionStatusWithWS = async(nsp, socket, status) => {
  const rst = await getActionStatus(nsp, socket, status).then(dt => dt).catch(err => err)
  nsp.emit('receiveActionStatus', rst)
  return rst
}

exports.getPaperListWithWS = async (nsp, socket) => {
  const rst = await getPaperList(nsp, socket).then(dt => dt).catch(err => err)
  nsp.emit('receivePaperList', rst)
}

exports.selectPaperWithWS = async (nsp, socket, id) => {
  const rst = await selectPaper(nsp, socket, id).then(dt => dt).catch(err => err)
  return rst
}
