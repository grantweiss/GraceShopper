import axios from 'axios'

const initialState = []

//ACTION NAMES
const SET_ORDERS = 'SET_ORDERS'
const SHOW_PENDING_ORDERS = 'SHOW_PENDING_ORDERS'
const SHOW_COMPLETED_ORDERS = 'SHOW_COMPLETED_ORDERS'
const SHOW_CANCELLED_ORDERS = 'SHOW_CANCELLED_ORDERS'

//ACION CREATOR
export const setAllOrders = orders => {
  return {
    type: SET_ORDERS,
    orders
  }
}
export const showCancelledOrders = () => {
  return {
    type: SHOW_CANCELLED_ORDERS
  }
}

export const showCompletedOrders = () => {
  return {
    type: SHOW_COMPLETED_ORDERS
  }
}

export const showPendingOrders = () => {
  return {
    type: SHOW_PENDING_ORDERS
  }
}

//THUNK
export const fetchAllOrders = () => {
  return async function(dispatch) {
    let response
    response = await axios.get('/api/orders')
    const allOrders = response.data
    dispatch(setAllOrders(allOrders))
  }
}

export const showPendingOnView = () => {
  return async function(dispatch) {
    let response
    response = await axios.get('/api/orders')
    const allOrders = response.data
    dispatch(setAllOrders(allOrders))
    dispatch(showPendingOrders())
  }
}
export const showCancelledOnView = () => {
  return async function(dispatch) {
    let response
    response = await axios.get('/api/orders')
    const allOrders = response.data
    dispatch(setAllOrders(allOrders))
    dispatch(showCancelledOrders())
  }
}
export const showCompletedOnView = () => {
  return async function(dispatch) {
    let response
    response = await axios.get('/api/orders')
    const allOrders = response.data
    dispatch(setAllOrders(allOrders))
    dispatch(showCompletedOrders())
  }
}

//REDUCER
export const allOrders = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    case SHOW_PENDING_ORDERS:
      return state.filter(order => order.status === 'created')
    case SHOW_CANCELLED_ORDERS:
      return state.filter(order => order.status === 'cancelled')
    case SHOW_COMPLETED_ORDERS:
      return state.filter(order => order.status === 'completed')
    default:
      return state
  }
}
