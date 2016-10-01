
const config = require('../config.default.js')

try {
  let customConfig = require('../config.js')
  Object.assign(config, customConfig)
} catch(e) {
  console.log('no config.js, better create one by "cp config.default.js config.js"')
}

module.exports = config