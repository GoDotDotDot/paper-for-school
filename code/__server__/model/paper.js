const pool = require('./dbpool.js')
const xlsx = require('node-xlsx')

/**
 * INSERT INTO table(column1,column2...)
VALUES (value1,value2,...),
       (value1,value2,...),
 * @param {*} filePath
 */
function importPaper (filePath) {
  return new Promise((resolve, reject) => {
    try {
      const sql = insertSQL(filePath)
      resolve(pool.queryPromise(sql))
    } catch (err) {
      reject(err)
    }
  })
}
function insertSQL (filePath) {
  const workSheetsFromFile = xlsx.parse(filePath)
  const sheet1 = workSheetsFromFile[0].data
  let val = []
  for (let i = 1; i < sheet1.length; i++) {
    let field = new Array(sheet1[0].length)
    field = [...sheet1[i]]
    if (field.length === 0) continue
    val.push(parseDataToSql(field))
  }
  let valStr = val.join(',') + ';'
  let sql = `INSERT INTO paper(teacher,professional,stuNum,stuName,grade,_master,title,_from,type,conformity,degree,workload,hasAction,brief,_require,achieve) VALUES ${valStr}`
  return sql
}
// INSERT INTO paper(teacher,professional,stuNum,stuName,grade,master,title,from,type,conformity,degree,workload,hasAction,brief,require,achieve)
// VALUES
// 7
function parseDataToSql (dt) {
  try {
    const str = dt.slice(1).map((ele) => ele ? `'${ele}'` : 'NULL')
   // str[2] = parseInt(str[2].replace(/\'/g, '')) // 学号
    // str[4] = parseInt(str[4].replace(/\'/g, '')) // 年级
    if (str[7] !== "'学生自拟'") {
      str[3] = str[2] = 'NULL'
    }
    return `(${str.join(',')})`
  } catch (err) {
    throw err
  }
}
function importPaperFormForm (sql) {
  return new Promise((resolve, reject) => {
    try {
      resolve(pool.queryPromise(sql))
    } catch (err) {
      reject(err)
    }
  })
}
module.exports = {importPaper, importPaperFormForm, pool}
