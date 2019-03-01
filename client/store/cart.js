import axios from 'axios'
import store from './index'

const initialState = []

//ACTION NAMES
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const CHANGE_ITEM_QTY = 'CHANGE_ITEM_QTY'
const EMPTY_CART = 'EMPTY_CART'

//ACTION CREATORS

export const addCartItem = (beerid, quantity) => {
  return {type: ADD_CART_ITEM, lineItem}
}

export const removeCartItem = beerid => {
  return {type: REMOVE_CART_ITEM, beerid}
}
export const changeItemQty = (beerid, quantity) => {
  const lineItem = {beerid, quantity}
  return {type: CHANGE_ITEM_QTY, lineItem}
}
export const emptyCart = () => {
  return {type: EMPTY_CART}
}

//Thunks

export const storeCartOnServer = async userId => {
  await axios.delete(`/api/cart/${userId}`)
  await axios.post(`/api/cart/${userId}`, store.getState().cart)
}

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      return [...state, action.lineItem]
    case REMOVE_CART_ITEM:
      return state.filter(lineItem => {
        return lineItem.beerid !== action.beerid
      })
    case CHANGE_ITEM_QTY:
      return [
        ...state.filter(lineItem => {
          return lineItem.beerid !== action.lineItem.beerid
        }),
        action.lineItem
      ]
    case EMPTY_CART:
      return []
    default:
      return state
  }
}
