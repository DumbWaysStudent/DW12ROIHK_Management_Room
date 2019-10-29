//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from './../../navigator/RootNavigator';
import reducerUsers from './reducerUsers';
import reducerRooms from './reducerRooms';
import reducerCustomers from './reducerCustomers';
import reducerOrders from './reducerOrders';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  users: reducerUsers,
  rooms: reducerRooms,
  customers: reducerCustomers,
  orders: reducerOrders,
})

export default appReducer