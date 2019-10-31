import * as types from '../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  needRefresh: false,
  customers: [],
  imageUrl: ''
};

export default function reducerMyImages(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_CUSTOMERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.GET_CUSTOMERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: false,
        customers: action.payload
      };

    case `${types.GET_CUSTOMERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    //========================add========================//           
    case `${types.ADD_CUSTOMERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.ADD_CUSTOMERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        customers: action.payload
      };

    case `${types.ADD_CUSTOMERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };


    //========================delete========================//           
    case `${types.DELETE_CUSTOMERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.DELETE_CUSTOMERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        customers: action.payload
      };

    case `${types.DELETE_CUSTOMERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    //========================Update========================//           
    case `${types.UPDATE_CUSTOMERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.UPDATE_CUSTOMERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        customers: action.payload
      };

    case `${types.UPDATE_CUSTOMERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };


    //========================add photo========================//           
    case `${types.ADD_PHOTO_CUSTOMERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.ADD_PHOTO_CUSTOMERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        imageUrl: `https://management-room-rest-api.herokuapp.com/${action.payload.data.filePath}`
      };

    case `${types.ADD_PHOTO_CUSTOMERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };



    default:
      return state;
  }
}