import axios from 'axios'

export const GET_BEER = 'GET_BEER'

export const getBeer = beer => {
  return {
    type: GET_BEER,
    beer
  }
}

export const fetchSingleBeer = id => {
  return async dispatch => {
    const beer = await axios.get(`/api/beers/${id}`)
    dispatch(getBeer(beer.data))
  }
}

export const singleBeer = (state = {}, action) => {
  switch (action.type) {
    case GET_BEER:
      return action.beer
    default:
      return state
  }
}
