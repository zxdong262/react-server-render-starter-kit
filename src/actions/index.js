
import url from '../common/api'
import { types } from '../reducers'
import fetch from '../common/fetch'

function onload(dispatch, loading) {
  dispatch({
    type: types.set_onload
    ,data: loading
  })
}

export function setProp(action) {

  return dispatch => {
    dispatch(action)
  }

}

export function getPosts(data, type, cb) {

  return async dispatch => {

    //statrt
    onload(dispatch, true)
    let res = await fetch.get(url.get_posts, data)
    onload(dispatch, false)
    dispatch({
      type: types[type]
      ,data: type === 'set_post'?res.result[0]:res.result
    })
    dispatch({
      type: types.set_total
      ,data: res.total
    })

    if(cb) cb(res)
    
  }

}

export function getCats(data, type, cb) {

  return async dispatch => {

    //statrt
    onload(dispatch, true)
    let res = await fetch.get(url.get_cats, data)
    onload(dispatch, false)
    dispatch({
      type: types[type]
      ,data: type === 'set_cat'?res.result[0]:res.result
    })

    if(cb) cb(res)

  }

}