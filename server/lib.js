
//route handlers

//db mock
const _ = require('lodash')
const db = require('../test/data').gen(_.random(2, 5), _.random(470, 620))
Object.freeze(db)
const config = require('./config')
const local = _.pick(config.pkg, ['name', 'version', 'keywords', 'description', 'homepage'])
let render = ctx => ctx.local

try {
  render = require('./render.min').default
} catch(e) {
  console.log('need render function ')
}

const searchPost = (ctx) => {
  let query = ctx.query
  let page = query.page || 1
  let pageSize = query.pageSize || 20
  let title = query.title
  let id = query.postid
  let catid = query.catid

  //pager
  let start = (page - 1) * pageSize
  let end = start + pageSize
  let results = db.posts.filter(p => {
    let res = true
    if (title) res = res && p.title.indexOf(title) > -1
    if (id) res = res && p.id === id
    else if (catid) res = res && p.cat.id === catid
    return res
  })
  let total = results.length
  let result = results.slice(start, end)
  
  return {
    result, total
  }
}

const searchCat = (ctx) => {
  let query = ctx.query
  let page = query.page || 1
  let pageSize = query.pageSize || 20
  let title = query.title
  let catid = query.catid
  
  //pager
  let start = (page - 1) * pageSize
  let end = start + pageSize
  let results = db.cats.filter(p => {
    let res = true
    if (title) res = res && p.title.indexOf(title) > -1
    if (catid) res = res && p.id === catid
    return res
  })

  let total = results.length
  let result = results.slice(start, end)

  return {
    result, total
  }
}

exports.init = function* (next) {

	let arr = this.href.split('/')
	,host = arr[0] + '//' + arr[2]

	this.local = Object.assign({}, local, {
		host: host
		,href: this.href
		,path: this.path
	})

	this.local.cdn = config.cdn || host
	
	return yield next
}

exports.page = function* (next) {
  let local = yield render(this)
  local.bundlePath = config.env === 'production' ? local.cdn : `http://localhost:${config.wport}`
  return this.render('index', { local })
}

exports.posts = function* (next) {
  let res = searchPost(this)
  this.body = res
}

exports.cats = function* (next) {
  let res = searchCat(this)
  this.body = res
}