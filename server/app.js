/*!
 * SERVER
 **/

const
config = require('./config')
koa = require('koa'),
serve = require('koa-static'),
oneYear = 1000 * 60 * 60 * 24 * 365,
app = koa(),
bodyParser = require('koa-bodyparser'),
conditional = require('koa-conditional-get'),
etag = require('koa-etag'),
Pug = require('koa-pug'),
mount = require('koa-mount'),
isProduction = config.env === 'production',
cwd = process.cwd(),
resolve = require('path').resolve,
routes = require('./routes').init

app.use(serve(resolve(__dirname, '../views'), {
	maxAge: oneYear
}))

app.use(
  mount('/_bc', serve(resolve(__dirname, '../node_modules'), {
	  maxAge: oneYear
  }))
)

app.use(bodyParser())
app.use(conditional())
app.use(etag())
routes(app)

//pug template
const pug = new Pug({
	viewPath: cwd + '/views',
	debug: !isProduction,
	pretty: !isProduction,
	compileDebug: !isProduction,
	noCache: isProduction,
	app: app // equals to pug.use(app) and app.use(pug.middleware)
})

//start
module.exports = app