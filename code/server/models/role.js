const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  permission: {
    type: Array
  },
  routerSource: {
    type: Array
  }
}, {collection: 'Role'})

module.exports = mongoose.model('Role', RoleSchema)
