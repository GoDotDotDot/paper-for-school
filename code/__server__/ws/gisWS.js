const students = require('../model/students/index')

let wsNSP
exports.selectPaper = (io, sessionMiddleWare) => {
  var nsp = io.of('/gis')
  nsp.use((socket, next) => {
    sessionMiddleWare(socket.request, socket.request.res, next)
  })
  nsp.on('connection', async function (socket) {
    /**
     * @desc 学生选题
     * @param {Number} id 选题ID
     */
    socket.on('selectPaper', async(id) => {
      const rst = await students.selectPaperWithWS(nsp, socket, id).then(dt => dt).catch(err => err)
      console.log(rst)
      socket.emit('receiveSelectPaperRst', rst)
      students.getPaperListWithWS(nsp, socket)
    })

    // 初始化数据
    const rst = await students.getActionStatusWithWS(nsp, socket).then(dt => dt).catch(err => err)
    const { data } = rst
    const dt = data && data[0]
    if (dt) {
      const { status } = dt
      if (status === '未开始') {
        const { startTime } = dt
        const leftTime = new Date(startTime) - Date.now()
        if (leftTime <= 1000 * 60 * 10) {
          students.getPaperListWithWS(nsp, socket)
        }
      } else if (status === '进行中') {
        students.getPaperListWithWS(nsp, socket)
      }
    } else {
      console.log(nsp.connected)
    }
  })
  nsp.on('recivePaperList', async (socket) => {
    // 此处需要传递学生专业年级参数
    const rst = await students.getPaperListWithWS().then(dt => dt).catch(err => err)
    socket.emit('recivePaperList', rst)
  })

  wsNSP = nsp
  // 测试专用，线上版本请删除
  global.wsNSP = wsNSP

  // nsp.use(sharedsession(session, {
  //   autoSave: true
  // }))
}
exports.getNSP = () => wsNSP
