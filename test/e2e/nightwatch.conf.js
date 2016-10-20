// http://nightwatchjs.org/guide#settings-file
const config = require('../../server/config')

module.exports = {
  "src_folders": ["test/e2e/specs"],
  "output_folder": "test/e2e/reports",
  "custom_assertions_path": ["test/e2e/custom-assertions"],

  "selenium": {
    "start_process": true,
    "server_path": "node_modules/selenium-server/lib/runner/selenium-server-standalone-2.53.1.jar",
    "host": "127.0.0.1",
    "port": config.tport,
    "cli_args": {
      "webdriver.chrome.driver": require('chromedriver').path
    }
  },

  "test_settings": {
    "default": {
      "selenium_port": config.tport,
      "selenium_host": "0.0.0.0",
      "silent": true
    },

    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}