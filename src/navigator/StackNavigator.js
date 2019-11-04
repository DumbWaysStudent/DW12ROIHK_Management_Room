import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import AddRoom from '../screens/AddRoom'
import EditRoom from '../screens/EditRooms'

import AddCustomer from '../screens/AddCustomer'
import EditCustomer from '../screens/EditCustomer'
import AddOrder from '../screens/AddOrder'
import Checkout from '../screens/Checkout'
import BottomTabNav from './BottomTabNav'

//import ScreenTest from './../screens/ScreenTest';

// without Bottom Tab Navigator
const StackNavigator = createStackNavigator({
  BottomTabNav:{
    screen: BottomTabNav,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  AddCustomer: {
    screen: AddCustomer,
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
  EditCustomer: {
    screen: EditCustomer,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  AddOrder: {
    screen: AddOrder,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
},
{
  headerMode: 'none',
  mode: 'modal',
  transparentCard: true,
  cardStyle:{
      backgroundColor:"transparent",
      opacity:0.99
  },
  navigationOptions: {
      cardStack: {
          gesturesEnabled: true,
      },
  },

}
);

export default createAppContainer(StackNavigator);