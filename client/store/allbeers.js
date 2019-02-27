import axios from 'axios'

const initialState = []

//ACTION NAMES
const SET_BEERS = 'SET_BEERS'
const REMOVE_BEER = 'REMOVE_BEER'
const ADD_BEER = 'ADD_BEER'
//ACTION CREATORS

export const setBeers = beers => {
  return {type: SET_BEERS, beers}
}

export const removeBeer = id => {
  return {
    type: REMOVE_BEER,
    id
  }
}

export const addBeer = beer => {
  return {
    type: ADD_BEER,
    beer
  }
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

export const removeBeerFromServer = beerId => {
  return async dispatch => {
    await axios.delete(`/api/beers/${beerId}`)
    dispatch(removeBeer(beerId))
  }
}

export const createBeer = beer => {
  return async dispatch => {
    const response = await axios.post('/api/beers', beer)
    dispatch(addBeer(response.data))
  }
}

export const beers = (state = initialState, action) => {
  switch (action.type) {
    case SET_BEERS:
      return action.beers
    case ADD_BEER:
      return [...state, action.beer]
    case REMOVE_BEER:
      return state.filter(beer => beer.id !== action.id)
    default:
      return state
  }
}
