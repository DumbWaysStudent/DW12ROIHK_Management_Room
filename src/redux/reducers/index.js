//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from './../../navigator/RootNavigator'
import reducerTodos from './reducerTodos';
import reducerUsers from './reducerUsers';

import reducerRooms from './reducerRooms';
import reducerCustomers from './reducerCustomers';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  todos: reducerTodos,
  users: reducerUsers,
  
  rooms: reducerRooms,
  customers: reducerCustomers,
})

export default appReducer