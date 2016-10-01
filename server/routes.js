
const Router = require('koa-router')
const lib = require('./lib')
const router = new Router()

//all pages
let pages = ['/', '/cats/:catid', '/:catid/:post:id', '/s']

pages.forEach(r => {
  router.get(r, lib.page)
})

//api for post and cats
router.get('/api/posts', lib.posts)
router.get('/api/cats', lib.cats)

exports.init = function(app) {
  app.use(lib.init)
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.use(function* (next) {
    this.render('404', { local: this.local })
  })
  app.on('error', function (err, ctx) {
    console.log(err.stack || err)
    let path = ctx.path
    if(/^\/api\//.test(path)) {
      ctx.body = {
        err
      } 
    } else {
      let local = Object.assign(ctx.local, { err })
      ctx.render('500', { local })
    }
  })
}