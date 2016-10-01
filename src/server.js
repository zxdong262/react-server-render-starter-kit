import React from 'react'
import * as tools from './common/constants'
import { renderToString } from 'react-dom/server'
import { bindActionCreators } from 'redux'
import { match, RouterContext } from 'react-router'

function getRenderProps({ routes, location }) {

  return new Promise((resolve, reject) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if(error) reject(error)
      else resolve({ redirectLocation, renderProps })
    })
  })

}

export default async function (ctx) {

  let { local } = ctx
  tools.init(local)
  const { Provider } = require('react-redux')
  const { routes, store } = require('./routes')
  const actions = require('./actions')
  let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
  let { renderProps } = await getRenderProps({ routes, location: ctx.originalUrl })
  let { dispatch } = store
  let acts = mapDispatchToProps(dispatch)
  let fetchs = renderProps.components.map(c => c?c.WrappedComponent.fetchData:false)

  for(let i = 0, len = fetchs.length;i < len;i ++) {
    let fetch = fetchs[i]
    if(fetch) await fetch({...renderProps, ...acts})
  }

  let state = store.getState()
  return (
    {
      ...local,
      html: renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      ),
      state
    }
  )

}