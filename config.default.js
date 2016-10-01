
/*! 
 * default config, better create a local config by "cp config.default.js config.js"
 * local config will be ignored by git
 * so you can modify it freely
**/

const pkg = require('./package.json')

module.exports = exports.default = {

  //env
  env: process.env.NODE_ENV || 'dev',

  //server port
  port: 8523,

  //server listen host
  host: '0.0.0.0',

  //webpack server port
  wport: 8527,

  //e2e test port
  tport: 8536,

  //test runner port
  testRunnerPort: 8976,

  pkg

}