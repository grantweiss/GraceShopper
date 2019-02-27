import axios from 'axios'
import Axios from 'axios'

const initialState = []

//ACTION NAMES
const SET_CATEGORIES = 'SET_CATEGORIES'

//ACTION CREATORS

export const setCategories = categories => {
  return {type: SET_CATEGORIES, categories}
}

//THUNKS

export const fetchCategories = () => {
  return async function(dispatch) {
    const response = await Axios.get('/api/categories')
    const categories = response.data
    dispatch(setCategories(categories))
  }
}

export const categories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories

    default:
      return state
  }
}
