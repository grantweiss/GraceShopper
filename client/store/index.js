import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {users} from './allUsers'
import {singleBeer} from './singleBeer'
import {beers} from './allbeers'
import {categories} from './categories'

const reducer = combineReducers({user, users, singleBeer, beers, categories})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
