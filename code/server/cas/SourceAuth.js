const Source = require('../models/source')

const SourceAuth = (req, res, next) => {
  const {type, name} = req.query
  return Source.findOne({type, name})
  .then((source) => {
    if (!source) {
      return {status: 404}
    }
    source.status = 200
    return source
  }).catch(err => {
    throw err
  })
}

module.exports = SourceAuth
