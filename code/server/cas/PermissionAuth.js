const Permission = require('../models/permission')

const PermissionAuth = (source, action, role) => {
  const srcActions = source.actions
  const srcPermission = Array.prototype.find.call(srcActions, (ele) => ele === action)
  if (srcPermission) {
    const {_id} = source
    return Permission.findOne({source: _id, action})
    .then((permission) => {
      if (!permission) {
        return false
      } else {
        return Array.prototype.find.call(permission.roles, (ele) => ele === role)
      }
    }).catch(err => {
      throw err
    })
  } else {
    return false
  }
}

module.exports = PermissionAuth
