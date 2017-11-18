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
function getSql (filePath) {
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
  let sql = `INSERT INTO students(stuNum,name,gender,grade,class,_master) VALUES ${valStr}`
  return sql
}
// INSERT INTO paper(teacher,professional,stuNum,stuName,grade,master,title,from,type,conformity,degree,workload,hasAction,brief,require,achieve)
// VALUES
// 7
function parseDataToSql (dt) {
  try {
    const str = dt.slice(1).map((ele) => ele ? `'${ele}'` : 'NULL')
    // str[0] = parseInt(str[0].replace(/\'/g, '')) // 学号
   // str[3] = parseInt(str[3].replace(/\'/g, '')) // 年级
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
module.exports = {getSql, pool}
