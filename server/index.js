
const app = require('./app')
const config = require('./config')
const { port, host } = config
app.listen(port, host, function() {
	console.log(`${new Date()} ${config.pkg.name} runs on ${host}:${port}`)
})