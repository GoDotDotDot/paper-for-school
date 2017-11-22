const students = require('../../model/students/index')

exports.selectPaper = (io) => {
  var nsp = io.of('/selectPaper')
  nsp.on('connection', async function (socket) {
    console.log('someone connected')
    const rst = await students.getActionStatusWithWS()
    socket.emit('status', rst)
  })
  io.on('connection', function (socket) {
    console.log('someone connected')
    socket.emit('hi', 'everyone1111!')
  })
}
