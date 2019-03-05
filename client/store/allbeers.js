import axios from 'axios'

const initialState = []

//ACTION NAMES
const SET_BEERS = 'SET_BEERS'
const REMOVE_BEER = 'REMOVE_BEER'
const ADD_BEER = 'ADD_BEER'
const SEARCH_NAME_BEER = 'SEARCH_NAME_BEER'

//ACTION CREATORS

export const setBeers = beers => {
  return {type: SET_BEERS, beers}
}

export const setSearchNameBeer = beers => {
  return {type: SEARCH_NAME_BEER, beers}
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

export const fetchPage = (page = 1) => {
  return async function(dispatch) {
    const response = await axios.get(`/api/beers/page/${page}`)
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

export const createBeer = (beer, history) => {
  return async dispatch => {
    const response = await axios.post('/api/beers', beer)
    dispatch(addBeer(response.data))
    history.push(`/beers/${response.data.id}`)
  }
}

export const searchBeer = query => {
  console.log('THUNK')
  return async dispatch => {
    const response = await axios.get('/api/beers/name', query)
    console.log(response.data)
    dispatch(setSearchNameBeer(response.data))
  }
}

export const beers = (state = initialState, action) => {
  switch (action.type) {
    case SET_BEERS:
      return action.beers
    case ADD_BEER:
      return [...state, action.beer]
    case SEARCH_NAME_BEER:
      return action.beers
    case REMOVE_BEER:
      return state.filter(beer => beer.id !== action.id)
    default:
      return state
  }
}
