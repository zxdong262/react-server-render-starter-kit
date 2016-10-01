
//test data generator

const _ = require('lodash')
const dolor = require('dolor')

exports.gen = (catLen = _.random(5, 9), postLen = _.random(80, 120)) => {

  //categories
  let cats = new Array(catLen).fill(1).map((x, i) => {
    let j = i + 1
    return {
      id: '_cat_' + j,
      title: `test categorie ${j}`,
      desc: `desc for categorie ${j}`
    }
  })

  //posts
  let posts = new Array(postLen).fill(1).map((x, i) => {
    let j = i + 1
    let lenp = _.random(1, 6)
    let rc = _.random(0, catLen - 1)
    return {
      id: '_post_' + j,
      title: `test title post ${j}`,
      content: dolor.sentences(lenp),
      cat: cats[rc],
      date: new Date()
    }
  })

  return { cats, posts }

}
