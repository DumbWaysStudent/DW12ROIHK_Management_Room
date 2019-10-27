import * as types from './../types'
import axios from 'axios'

export const handlePostUsers = (data) => ({
  type: types.POST_USERS,
  payload: axios({
    method: 'POST',
    url:'https://management-room-rest-api.herokuapp.com/api/v2/login',
  data: {
    username: data.username,
    password: data.password
  }
})
});

export const handleRegister = (data) => ({
  type: types.GET_USERS,
  payload: axios({
    method: 'post',
    url:`https://management-room-rest-api.herokuapp.com/api/v2/register`,
    data: data
  })
});