import axios from 'axios'

export const GET_ORDER = 'GET_ORDER'

export const getSingleOrder = order => {
  return {
    type: GET_ORDER,
    order
  }
}

export const fetchSingleOrder = id => {
  return async dispatch => {
    const order = await axios.get(`/api/orders/${id}`)
    dispatch(getSingleOrder(order.data))
  }
}

export const singleOrder = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
