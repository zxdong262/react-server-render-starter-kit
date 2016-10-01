
import initState from './init-state'
import { constantFactory, reducerFactory } from 'redux-factories'
const types = constantFactory(initState)
const reducers = reducerFactory(initState)
export { types }
export default reducers
