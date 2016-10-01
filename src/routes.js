import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import App from './containers/App'
import Home from './containers/Home'
import Post from './containers/Post'
import Cat from './containers/Cat'
import Search from './containers/Search'
import createStore from './store/configureStore'

const store = createStore(
  typeof window === 'undefined'
  ? {}
  : window.h5.state
)

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/s" component={Search} />
      <Route path="/cats/:catid" component={Cat} />
      <Route path="/:catid/:postid" component={Post} />
    </Route>
  </Router>
)

export { store, routes }