const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
  session: {
    type: Object
  },
  expires: Date
}, {collection: 'sessions', '_id': false})

module.exports = mongoose.model('Sessions', SessionSchema)
