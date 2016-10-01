import handleErr from './error-handler'
import 'isomorphic-fetch'

const jsonHeader = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function serialized (data) {
  let obj = data || {}
  return Object.keys(obj).sort()
  .reduce( (prev, curr, index) => {
    prev += (index?'&':'?') + curr + '=' + obj[curr]
    return prev
  }, '')
}

export default class Fetch {
  static get (url, data) {
    return Fetch.connect(url + serialized(data), { credentials: 'include' })
  }

  static post (url, data) {
    return Fetch.connect(
      url,
      {
        method: 'post',
        credentials: 'include',
        headers: jsonHeader,
        body: JSON.stringify(data)
      }
    )
  }

  // add default error handler
  static connect (url, body) {
    return fetch(url, body).then(response => response.json(), handleErr)
  }
}
