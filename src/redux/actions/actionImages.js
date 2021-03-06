import * as types from './../types'
import axios from 'axios'

export const handleGetImages = (webtoonId,episode) => ({
  type: types.GET_IMAGES,
  payload: axios.get(
    `https://positive-toon-rest-api.herokuapp.com/api/v1/webtoon/${webtoonId}/episode/${episode}/images`
    )
});