import * as types from './../types'
import axios from 'axios'

export const handleGetCheckin = (param) => ({
  type: types.GET_CHECKIN,
  payload: axios({
    method: 'GET',
    url: `https://management-room-rest-api.herokuapp.com/api/v2/checkin`,
    headers: {
      Authorization: `bearer ${param.token}`
    }
  })
});

export const handleAddOrder = (param) => ({
  type: types.ADD_ORDERS,
  payload: axios({
    method: 'POST',
    url: `https://management-room-rest-api.herokuapp.com/api/v2/order`,
    headers: {
        Authorization: `bearer ${param.token}`
      },
    data: param.data
  })
});

export const handleUpdateOrder = (param) => ({
  type: types.UPDATE_ORDERS,
  payload: axios({
    method: 'PATCH',
    url: `https://management-room-rest-api.herokuapp.com/api/v2/order/${param.order}`,
    headers: {
        Authorization: `bearer ${param.token}`
      },
    data: param.data
  })
});