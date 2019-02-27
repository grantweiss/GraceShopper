import axios from 'axios'

const initialState = []

//ACTION NAMES
const SET_USERS = 'SET_USERS'

//ACTION CREATORS

export const setUsers = users => {
  return {type: SET_USERS, users}
}

//THUNKS

export const fetchUsers = () => {
  return async function(dispatch) {
    const response = await axios.get('/api/users')
    const users = response.data
    dispatch(setUsers(users))
  }
}

export const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users

    default:
      return state
  }
}
