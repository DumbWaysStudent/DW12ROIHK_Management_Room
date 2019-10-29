import * as types from '../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  needRefresh: false,
  orders: []
};

export default function reducerRooms(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_CHECKIN}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.GET_CHECKIN}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: false,
        orders: action.payload
      };

    case `${types.GET_CHECKIN}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    //========================add========================//           
    case `${types.ADD_ORDERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.ADD_ORDERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        orders: action.payload
      };

    case `${types.ADD_ORDERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    //========================Update========================//           
    case `${types.UPDATE_ORDERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.UPDATE_ORDERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        needRefresh: true,
        orders: action.payload
      };

    case `${types.UPDATE_ORDERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

      default:
      return state;
  }
}