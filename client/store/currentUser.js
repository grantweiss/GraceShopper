import axios from 'axios'

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const CHANGE_RANK = 'CHANGE_RANK'

export const changeRank = id => {
  return {
    type: CHANGE_RANK,
    id
  }
}
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export const changeRankOnServer = (id, userType) => {
  return async dispatch => {
    await axios.put(`/api/users/${id}`, userType)
    const updateUserRank = await axios.get(`/api/users/${id}`)
    dispatch(setCurrentUser(updateUserRank.data))
  }
}
export const fetchCurrentUser = () => {
  return async dispatch => {
    const currentUser = await axios.get('/auth/me')
    dispatch(setCurrentUser(currentUser.data))
  }
}

export const fetchSingleUser = id => {
  return async dispatch => {
    const user = await axios.get(`/api/users/${id}`)
    dispatch(setCurrentUser(user.data))
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
