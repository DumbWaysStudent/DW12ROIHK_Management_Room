import * as types from './../types'
import axios from 'axios'

export const handleGetCustomers = (param) => ({
  type: types.GET_CUSTOMERS,
  payload: axios({
    method: 'GET',
    url: `https://management-room-rest-api.herokuapp.com/api/v2/customers`,
    headers: {
      Authorization: `bearer ${param.token}`
    }
  })
});

export const handleAddCustomers = (param) => ({
  type: types.ADD_CUSTOMERS,
  payload: axios({
    method: 'POST',
    url: `https://management-room-rest-api.herokuapp.com/api/v2/customer`,
    headers: {
      Authorization: `bearer ${param.token}`
    },
    data: param.data
  })
});

export const handleDeleteCustomers = (param) => ({
  type: types.DELETE_CUSTOMERS,
  payload: axios({
    method: 'DELETE',
    url: `https://management-room-rest-api.herokuapp.com/api/v2/customer/${param.customer}`,
    headers: {
      Authorization: `bearer ${param.token}`
    }
  })
});

export const handleUpdateCustomers = (param) => ({
  type: types.UPDATE_CUSTOMERS,
  payload: axios({
    method: 'PATCH',
    url: `https://management-room-rest-api.herokuapp.com/api/v2/customer/${param.customer}`,
    headers: {
      Authorization: `bearer ${param.token}`
    },
    data: param.data
  })
});

export const handleAddPhotoCustomers = (param) => ({
  type: types.ADD_PHOTO_CUSTOMERS,
  payload: axios({
    method: 'POST',
    url: `https://management-room-rest-api.herokuapp.com/api/v2/customer/${param.customer}`,
    headers: {
      Authorization: `bearer ${param.token}`
    },
    data: param.data
  })
});