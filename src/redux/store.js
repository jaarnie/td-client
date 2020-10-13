import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'

const initialState = {}

const middleware = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
})

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
