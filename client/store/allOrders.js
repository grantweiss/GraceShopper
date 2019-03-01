import axios from 'axios'

const initialState = []

//ACTION NAMES
const SET_ORDERS = 'SET_ORDERS'

//ACION CREATOR
export const setAllOrders = orders => {
  return {
    type: SET_ORDERS,
    orders
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
    default:
      return state
  }
}
