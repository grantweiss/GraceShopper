import axios from 'axios'

const initialState = []

//ACTION NAMES
const SET_USERS = 'SET_USERS'
const DELETE_USER = 'DELETE_USER'
//ACTION CREATORS

export const setUsers = users => {
  return {type: SET_USERS, users}
}
export const deleteUser = user => {
  return {
    type: DELETE_USER,
    user
  }
}
//THUNKS

export const fetchUsers = () => {
  return async function(dispatch) {
    const response = await axios.get('/api/users')
    const users = response.data
    dispatch(setUsers(users))
  }
}

export const deleteUserFromServer = id => async dispatch => {
  try {
    const user = await axios.delete(`/api/users/${id}`)
    dispatch(deleteUser(user.data))
  } catch (error) {
    Next(error)
  }
}

export const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case DELETE_USER:
      return [...state].filter(user => user.id !== action.user.id)
    default:
      return state
  }
}
