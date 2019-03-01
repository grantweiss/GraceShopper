import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import user from './user'
import {users} from './allUsers'
import {singleBeer} from './singleBeer'
import {beers} from './allbeers'
import {currentUser} from './currentUser'
import {categories} from './categories'
import {cart} from './cart'
import {allOrders} from './allOrders'
import {singleOrder} from './singleOrder'

const reducer = combineReducers({
  user,
  users,
  singleBeer,
  beers,
  categories,
  currentUser,
  cart,
  allOrders,
  singleOrder
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [
    'user',
    'users',
    'singleBeer',
    'beers',
    'categories',
    'currentUser'
  ],
  stateReconciler: autoMergeLevel2
}

const pReducer = persistReducer(persistConfig, reducer)

const store = createStore(pReducer, middleware)
export const persistor = persistStore(store)
export default store
export * from './user'
