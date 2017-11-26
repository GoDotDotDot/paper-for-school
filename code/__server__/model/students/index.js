const express = require('express')
const router = express.Router()
const format = require('date-fns/format')
var compareAsc = require('date-fns/compare_asc')
const pool = require('../dbpool')

// const gisWSNSP = require('../../model/students/index').getNSP()

const getActionStatus = (nsp, userInfo, status) => {
  const now = Date.now()
  const {grade, master} = userInfo
  const sql = `SELECT a.id, a.startTime, a.endTime, a._master, a.grade,b.name FROM action a LEFT JOIN
    teachers b ON a.createBy = b.id WHERE a._master = ${pool.escape(master)} AND a.grade = ${pool.escape(grade)} AND a.isDelete = 0 LIMIT 1`
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
const getPaperList = (nsp, userInfo) => {
  const {grade, master} = userInfo
  const sql = `SELECT * FROM paper where grade = '${grade}' AND _master='${master}' AND isDelete = 0`
  return pool.queryPromise(sql).then(rst => {
    // console.log(rst)
    return {success: true, data: rst.results}
  }).catch(err => {
    console.log(err)
    return {success: false, message: err.message}
  })
}

const selectPaper = async(nsp, socket, id) => {
  const {session} = socket.request
  const {account, name} = session.userInfo
  const selfRst = await pool.queryPromise(`SELECT * FROM paper WHERE stuNum = ${pool.escape(account)}`)
  .then(rst => {
    const data = rst.results[0]
    if (data) {
      return ({success: false, message: `您已经选择了${data.teacher}老师的《${data.title}》，请勿重复选课！`})
    }
    return ({success: true, message: `允许选课`})
  }).catch(err => {
    return ({success: false, message: `查询出错！错误信息：${err.message}，请将该信息反馈给管理员！`})
  })
  if (!selfRst.success) { return selfRst }
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
          // const {session} = socket.request
          // const {account, name} = session.userInfo
          const upSql = `UPDATE paper SET stuNum = ${connection.escape(account)},
            stuName = ${connection.escape(name)} WHERE id =${id}`
          connection.query(upSql, (err, rst) => {
            if (err) {
              reject({success: false, message: err.message})
            }
            // console.log(err)
            connection.commit(function (err) {
              if (err) {
                return connection.rollback(function () {
                  reject({success: false, message: '选课失败！数据库即将回滚'})
                  throw err
                })
              }
              resolve({success: true, message: '选择成功！'})
              nsp.emit('recivePaperList')
              // console.log('success!')
            })
          })
        })
      })
    })
  })
}

const unSelectPaper = async (nsp, socket, id) => {
  try {
    const {session} = socket.request
    const {account} = session.userInfo
    const querySql = `SELECT * FROM paper WHERE stuNum = ${pool.escape(account)}`
    const rst = await pool.queryPromise(querySql).then(rst => {
      const {results} = rst
      if (results.length === 0) {
        return {success: false, message: '您还没有选课'}
      }
      const {id} = results[0]
      return {success: true, data: id}
    }).catch(err => {
      return {success: false, message: '发生了一点错误'}
    })
    if (!rst.success) {
      return {success: false, message: rst.message}
    }
    const sql = `UPDATE paper SET stuNum = NULL,
      stuName = NULL,
      studentsId = NULL WHERE id = ${id}`
    return pool.queryPromise(sql)
    .then(rst => {
      return {success: true, message: '退选成功'}
    }).catch(err => {
      return {success: false, message: '退选失败'}
    })
  } catch (err) {
    return {success: false, message: '操作失败' + err.message}
  }
}
// 全局、局部
exports.unSelectPaperWithWS = async (nsp, socket, id) => {
  const rst = await unSelectPaper(nsp, socket, id)
  if (rst.success) {
    const {session} = socket.request
    if (!session) socket.disconnect(true)
    else {
      const {userInfo} = session
      this.getPaperListWithWS(nsp, userInfo)
    }
  }
  return rst
}
exports.queryPaperByStu = (stuNum, grade, master) => {
  const sql = `SELECT title,teacher,id FROM paper WHERE stuNum=${pool.escape(stuNum)} AND grade=${pool.escape(grade)} AND _master=${pool.escape(master)}`
  return pool.queryPromise(sql)
  .then(rst => {
    const {results} = rst
    if (results.length > 0) {
      return {success: true, data: results}
    } else {
      return {success: false, message: '您还没有选课！'}
    }
  })
}
// 全局 grade, master
exports.getActionStatusWithWS = async(nsp, userInfo, status) => {
  const rst = await getActionStatus(nsp, userInfo, status).then(dt => dt).catch(err => err)
  nsp.emit('receiveActionStatus', rst)
  return rst
}
// 全局 grade, master
exports.getPaperListWithWS = async (nsp, userInfo) => {
  const rst = await getPaperList(nsp, userInfo).then(dt => dt).catch(err => err)
  nsp.emit('receivePaperList', rst)
  return rst
}
// 局部
exports.selectPaperWithWS = async (nsp, socket, id) => {
  const rst = await selectPaper(nsp, socket, id).then(dt => dt).catch(err => err)
  return rst
}
