import * as types from '../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    episodes: []
};

export default function reducerMyEpisodes(state = initialState, action) {
    switch (action.type) {
        case `${types.GET_MY_EPISODES}_PENDING`:
            return {
                ...state,
                isLoading: true
            };

        case `${types.GET_MY_EPISODES}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                episodes: action.payload
            };

        case `${types.GET_MY_EPISODES}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        //========================add my episode========================//     
        case `${types.ADD_MY_EPISODES}_PENDING`:
            return {
                ...state,
                isLoading: true
            };

        case `${types.ADD_MY_EPISODES}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                episodes: action.payload
            };

        case `${types.ADD_MY_EPISODES}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
//========================delete my episode========================//     
case `${types.DELETE_MY_EPISODES}_PENDING`:
    return {
        ...state,
        isLoading: true
    };

case `${types.DELETE_MY_EPISODES}_FULFILLED`:
    return {
        ...state,
        isLoading: false,
        isSuccess: true,
        episodes: action.payload
    };

case `${types.DELETE_MY_EPISODES}_REJECTED`:
    return {
        ...state,
        isLoading: false,
        isError: true,
    };
        default:
            return state;
    }
}