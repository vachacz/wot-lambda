import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"

import { createLogger } from "redux-logger"
import reducer from './reducers'

const middleware = applyMiddleware(createLogger(), thunk)
export default createStore(reducer, middleware)