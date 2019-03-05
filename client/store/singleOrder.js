import axios from 'axios'
import {removeCartOnServer, emptyCart} from './cart'
import store from './index'

const UPDATE_ORDER_ON_STORE = 'UPDATE_ORDER_ON_STORE'

export const updateOrderOnStore = order => {
  return {
    type: UPDATE_ORDER_ON_STORE,
    order
  }
}
export const fetchSingleOrder = id => {
  return async dispatch => {
    const order = await axios.get(`/api/orders/${id}`)
    dispatch(updateOrderOnStore(order.data))
  }
}

export const createOrder = (fullOrder, history) => {
  return async dispatch => {
    const newOrder = await axios.post(`/api/orders`, fullOrder)
    if (store.getState().user.id) {
      dispatch(removeCartOnServer(store.getState().user.id))
    } else {
      dispatch(emptyCart())
    }
    dispatch(updateOrderOnStore(newOrder.data))
    history.push(`/orders/${newOrder.data.id}`)
  }
}
export const markOrderAsCompleted = order => {
  return async dispatch => {
    const updatedOrder = await axios.put(`/api/orders/${order.id}`, {
      status: 'completed'
    })

    dispatch(updateOrderOnStore(updatedOrder.data))
  }
}
export const markOrderAsProcessing = order => {
  return async dispatch => {
    const updatedOrder = await axios.put(`/api/orders/${order.id}`, {
      status: 'processing'
    })

    dispatch(updateOrderOnStore(updatedOrder.data))
  }
}

export const markOrderAsCancelled = order => {
  return async dispatch => {
    const updatedOrder = await axios.put(`/api/orders/${order.id}`, {
      status: 'cancelled'
    })

    dispatch(updateOrderOnStore(updatedOrder.data))
  }
}

export const singleOrder = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_ON_STORE:
      return action.order
    default:
      return state
  }
}
