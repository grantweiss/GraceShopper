import axios from 'axios'

export const GET_BEER = 'GET_BEER'

export const getBeer = beer => {
  return {
    type: GET_BEER,
    beer
  }
}

export const createReview = (beerId, review) => {
  return async dispatch => {
    await axios.post(`/api/beers/${beerId}/review`, review)
    const beer = await axios.get(`/api/beers/${beerId}`)
    dispatch(getBeer(beer.data))
  }
}

export const fetchSingleBeer = id => {
  return async dispatch => {
    const beer = await axios.get(`/api/beers/${id}`)
    dispatch(getBeer(beer.data))
  }
}

export const editBeerOnServer = (beer, id) => {
  return async dispatch => {
    const editedBeer = await axios.put(`/api/beers/${id}`, beer)
    dispatch(getBeer(editedBeer.data))
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
