import axios from 'axios'

export const GET_ORDER = 'GET_ORDER'
const MARK_ORDER_AS_PROCESSING = 'MARK_ORDER_AS_PROCESSING'
const MARK_ORDER_AS_COMPLETED = 'MARK_ORDER_AS_COMPLETED'

export const getSingleOrder = order => {
  return {
    type: GET_ORDER,
    order
  }
}

export const markOneOrderAsCompleted = order => {
  return {
    type: MARK_ORDER_AS_COMPLETED,
    order
  }
}

export const markOneOrderAsProcessing = order => {
  return {
    type: MARK_ORDER_AS_PROCESSING,
    order
  }
}

export const markOrderAsCompleted = order => {
  return async dispatch => {
    const updatedOrder = await axios.put(`/api/orders/${order.id}`, order)
    dispatch(markOneOrderAsCompleted(updatedOrder.data))
  }
}
export const markOrderAsProcessing = order => {
  return async dispatch => {
    const updatedOrder = await axios.put(`/api/orders/${order.id}`, order)
    dispatch(markOneOrderAsProcessing(updatedOrder.data))
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
    case MARK_ORDER_AS_COMPLETED:
      return action.order
    case MARK_ORDER_AS_PROCESSING:
      return action.order
    default:
      return state
  }
}
