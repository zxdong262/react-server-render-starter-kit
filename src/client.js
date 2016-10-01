
import * as tools from './common/constants'
tools.init(window.h5)
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import './css/style.styl'

const { routes, store } = require('./routes')

render(
	<Provider store={store}>
		{routes}
	</Provider>
  ,document.getElementById('wrapper')
)