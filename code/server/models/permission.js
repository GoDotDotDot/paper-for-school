const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PermissionSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  source: {
    type: Schema.Types.ObjectId
  },
  roles: {
    type: Array
  },
  action: {
    type: String
  },
  among: {
    type: String
  }
}, {collection: 'Permission'})

module.exports = mongoose.model('Permission', PermissionSchema)
