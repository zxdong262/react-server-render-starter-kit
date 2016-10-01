'use strict'

process.env.NODE_ENV = 'development'

const
config = require('../../server/config'),
port = config.testRunnerPort,
host = '0.0.0.0',
app = require('../../server/app')
app.listen(port, host, function() {
  console.log(`${new Date()} ${config.pkg.name} runs on ${host}:${port}`)


  // 2. run the nightwatch test suite against it
  // to run in additional browsers:
  //    1. add an entry in test/e2e/nightwatch.conf.json under "test_settings"
  //    2. add it to the --env flag below
  // For more information on Nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file

  var spawn = require('cross-spawn')
  var runner = spawn(
    './node_modules/.bin/nightwatch', [
      '--config', 'test/e2e/nightwatch.conf.js',
      '--env', 'chrome'
    ], {
      stdio: 'inherit'
    }
  )

  runner.on('exit', function(code) {
    process.exit(code)
  })

  runner.on('error', function(err) {
    throw err
  })

})