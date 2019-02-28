const initialState = []

//ACTION NAMES
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const CHANGE_ITEM_QTY = 'CHANGE_ITEM_QTY'

//ACTION CREATORS

export const addCartItem = (beerId, qty) => {
  const lineItem = {beerId, qty}
  let cart = localStorage.getItem('cart')
  if (cart) {
    cart.push({beerId, qty})
  } else {
    cart = [{beerId, qty}]
  }
  localStorage.setItem('cart', cart)
  return {type: ADD_CART_ITEM, lineItem}
}

export const removeCartItem = beerId => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    cart = cart.filter(lineItem => {
      return lineItem.beerId !== beerId
    })
  }
  localStorage.setItem('cart', cart)
  return {type: REMOVE_CART_ITEM, beerId}
}
export const changeItemQty = (beerId, qty) => {
  let cart = localStorage.getItem('cart')
  const lineItem = {beerId, qty}
  if (cart) {
    cart = cart.filter(lineItem => {
      return lineItem.beerId !== beerId
    })
    cart.push({beerId, qty})
  }
  localStorage.setItem('cart', cart)
  return {type: CHANGE_ITEM_QTY, lineItem}
}

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      return [...state, action.lineItem]
    case REMOVE_CART_ITEM:
      return state.filter(lineItem => {
        return lineItem.beerId !== beerId
      })
    case CHANGE_ITEM_QTY:
      return [
        ...state.filter(lineItem => {
          return lineItem.beerId !== action.lineItem.beerId
        }),
        action.lineItem
      ]
    default:
      return state
  }
}
