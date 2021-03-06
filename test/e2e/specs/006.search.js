'use strict'

let config = require('../../../server/config')
,port = config.testRunnerPort
,host = 'http://127.0.0.1:' + port
,tests = [
	{
		title: 'search - no result'
		,waitForElementVisible: '#wrapper'
		,elementPresent: '#nav'
		,containsText: ['h1', 'search "dddd"']
		,elementCount: ['h1', 1]
		,url: 'http://127.0.0.1:' + port + '/s?title=dddd'
	}
	,{
		title: 'search - has result'
		,waitForElementVisible: '#wrapper'
		,elementPresent: '#nav'
		,containsText: ['h1', 'search "1"']
		,elementCount: ['h2', 20]
		,url: 'http://127.0.0.1:' + port + '/s?title=1'
	}
]

tests.forEach(function(test) {

	exports[test.title] = function(browser) {
		browser
			.url(test.url)
			.waitForElementVisible(test.waitForElementVisible, 5000)
			.assert.elementPresent(test.elementPresent)
			.assert.containsText(test.containsText[0], test.containsText[1])
			.assert.elementCount(test.elementCount[0], test.elementCount[1])
			.end()
	}
	
})

