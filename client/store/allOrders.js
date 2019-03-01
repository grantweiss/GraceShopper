import axios from 'axios'

const initialState = []

//ACTION NAMES
const SET_ORDERS = 'SET_ORDERS'
const SHOW_PENDING_ORDERS = 'SHOW_PENDING_ORDERS'

//ACION CREATOR
export const setAllOrders = orders => {
  return {
    type: SET_ORDERS,
    orders
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

//REDUCER
export const allOrders = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    case SHOW_PENDING_ORDERS:
      return state.filter(order => order.status === 'created')
    default:
      return state
  }
}
