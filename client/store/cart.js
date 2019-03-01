import axios from 'axios'
import store from './index'

const initialState = []

//ACTION NAMES
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const CHANGE_ITEM_QTY = 'CHANGE_ITEM_QTY'
const EMPTY_CART = 'EMPTY_CART'

//ACTION CREATORS

export const addCartItem = (beer, quantity = 1) => {
  const lineItem = {beer, quantity}
  return {type: ADD_CART_ITEM, lineItem}
}

export const removeCartItem = beer => {
  return {type: REMOVE_CART_ITEM, beer}
}
export const changeItemQty = (beer, quantity) => {
  const lineItem = {beer, quantity}
  return {type: CHANGE_ITEM_QTY, lineItem}
}
export const emptyCart = () => {
  return {type: EMPTY_CART}
}

//Thunks

export const storeCartOnServer = (userId, cart) => {
  return async dispatch => {
    await axios.put(`/api/cart/${userId}`, cart)
  }
}

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      if (state.length > 0) {
        let matchItem = state.filter(
          lineItem => lineItem.beer.id === action.lineItem.beer.id
        )
        if (matchItem.length > 0) {
          let returnState = state.filter(lineItem => {
            return lineItem.beer.id !== action.lineItem.beer.id
          })
          matchItem[0].quantity =
            parseInt(matchItem[0].quantity, 10) +
            parseInt(action.lineItem.quantity, 10)
          return [...returnState, matchItem[0]]
        }
      }
      return [...state, action.lineItem]
    case REMOVE_CART_ITEM:
      return state.filter(lineItem => {
        return lineItem.beer.id !== action.lineItem.beer.id
      })
    case CHANGE_ITEM_QTY:
      return [
        ...state.filter(lineItem => {
          return lineItem.beer.id !== action.lineItem.beer.id
        }),
        action.lineItem
      ]
    case EMPTY_CART:
      return []
    default:
      return state
  }
}
