if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod').default
} else {
  module.exports = require('./dev').default
}
