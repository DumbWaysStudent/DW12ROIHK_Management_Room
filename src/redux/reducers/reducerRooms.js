import * as types from '../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  needRefresh: false,
  rooms: []
};

export default function reducerMyImages(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.GET_ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: false,
        rooms: action.payload
      };

    case `${types.GET_ROOMS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    //========================add my image========================//           
    case `${types.ADD_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.ADD_ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        rooms: action.payload
      };

    case `${types.ADD_ROOMS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };


    //========================delete my image========================//           
    case `${types.DELETE_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.DELETE_ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        rooms: action.payload
      };

    case `${types.DELETE_ROOMS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    //========================Update my image========================//           
    case `${types.UPDATE_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.UPDATE_ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        rooms: action.payload
      };

    case `${types.UPDATE_ROOMS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

      default:
      return state;
  }
}