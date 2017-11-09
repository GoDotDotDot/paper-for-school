const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SourceSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  type: {
    type: String
  },
  actions: {
    type: Array
  },
  among: {
    type: String
  }
}, {collection: 'Source'})

module.exports = mongoose.model('Source', SourceSchema)
