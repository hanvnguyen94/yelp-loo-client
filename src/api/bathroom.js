import apiUrl from '../apiConfig'
import axios from 'axios'

export const bathroomIndex = user => {
  return axios({
    url: apiUrl + '/bathrooms/',
    method: 'GET',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Token ${user.token}`
    }
  })
}

export const bathroomCreate = (bathroom, user) => {
  return axios({
    url: apiUrl + '/bathrooms/',
    method: 'POST',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Token ${user.token}`
    },
    // send the bathroom object as our data for creating a bathroom
    data: { bathroom }
  })
}
// get a single purchase
export const bathroomShow = (id, user) => {
  return axios({
    url: apiUrl + '/bathrooms/' + id,
    method: 'GET',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Token ${user.token}`
    }
  })
}

export const bathroomDelete = (id, user) => {
  return axios({
    url: apiUrl + '/bathrooms/' + id,
    method: 'DELETE',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Token ${user.token}`
    }
  })
}

export const bathroomUpdate = (id, bathroom, user) => {
  return axios({
    url: apiUrl + '/bathrooms/' + `${id}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { bathroom }
  })
}
