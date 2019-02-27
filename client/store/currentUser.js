import axios from 'axios'

export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export const fetchCurrentUser = () => {
  return async dispatch => {
    const currentUser = await axios.get('/auth/index/me')
    dispatch(setCurrentUser(currentUser.data))
  }
}

export const currentUser = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user
    default:
      return state
  }
}
