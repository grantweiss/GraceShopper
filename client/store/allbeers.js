import axios from 'axios'

const initialState = []

//ACTION NAMES
const SET_BEERS = 'SET_BEERS'

//ACTION CREATORS

export const setBeers = beers => {
  return {type: SET_BEERS, beers}
}

//THUNKS

export const fetchBeers = (search = '') => {
  return async function(dispatch) {
    let response
    if (search) {
      response = await axios.get(`/api/beers/search?${search}`)
    } else {
      response = await axios.get('/api/beers')
    }
    const beers = response.data
    dispatch(setBeers(beers))
  }
}

export const beers = (state = initialState, action) => {
  switch (action.type) {
    case SET_BEERS:
      return action.beers

    default:
      return state
  }
}
