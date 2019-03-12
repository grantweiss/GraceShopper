import axios from 'axios'

export const GET_BREWERY = 'GET_BREWERY'

export const getBrewery = brewery => {
  return {
    type: GET_BREWERY,
    brewery
  }
}

export const fetchSingleBrewery = id => {
  return async dispatch => {
    const brewery = await axios.get(`/api/breweries/${id}`)
    dispatch(getBrewery(brewery.data))
  }
}

export const singleBrewery = (state = {}, action) => {
  switch (action.type) {
    case GET_BREWERY:
      return action.brewery
    default:
      return state
  }
}
