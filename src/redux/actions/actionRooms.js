import * as types from './../types'
import axios from 'axios'

export const handleGetRooms = (param) => ({
  type: types.GET_ROOMS,
  payload: axios({
    method: 'GET',
    url: `http://192.168.0.29:5000/api/v2/rooms`,
    headers: {
      Authorization: `bearer ${param.token}`
    }
  })
});

export const handleAddRooms = (param) => ({
  type: types.ADD_ROOMS,
  payload: axios({
    method: 'POST',
    url: `http://192.168.0.29:5000/api/v2/room`,
    headers: {
      Authorization: `bearer ${param.token}`
    },
    data: param.data
  })
});

export const handleDeleteRooms = (param) => ({
  type: types.DELETE_ROOMS,
  payload: axios({
    method: 'DELETE',
    url: `http://192.168.0.29:5000/api/v2/room/${param.room}`,
    headers: {
      Authorization: `bearer ${param.token}`
    }
  })
});

export const handleUpdateRooms = (param) => ({
  type: types.UPDATE_ROOMS,
  payload: axios({
    method: 'PATCH',
    url: `http://192.168.0.29:5000/api/v2/room/${param.room}`,
    headers: {
      Authorization: `bearer ${param.token}`
    },
    data: param.data
  })
});