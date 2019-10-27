import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Loading from '../screens/LoadingScreen'
import Login from '../screens/Login'
import AddRoom from '../screens/AddRoom'
import EditRoom from '../screens/EditRooms'

import AddCustomer from '../screens/AddCustomer'
import EditCustomer from '../screens/EditCustomer'

//import ScreenTest from './../screens/ScreenTest';

// without Bottom Tab Navigator
const StackNavigator = createStackNavigator({
  // LoadingScreen: {
  //   screen: Loading,
  //   navigationOptions: ({ navigation }) => ({
  //     header: null
  //   }),
  // },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  
  AddRoom: {
    screen: AddRoom,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },

  EditRooms: {
    screen: EditRoom,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  
  AddCustomer: {
    screen: AddCustomer,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
    
  EditCustomer: {
    screen: EditCustomer,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
});

export default createAppContainer(StackNavigator);