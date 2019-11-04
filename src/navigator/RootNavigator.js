import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import StackNavigator from './StackNavigator'
import BottomTabNav from './BottomTabNav'
import Loading from '../screens/LoadingScreen'
import Login from '../screens/Login'

const RootNavigator = createStackNavigator({
  LoadingScreen: {
    screen: Loading,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  StackNavigator:{
    screen: StackNavigator,
  navigationOptions: ({ navigation }) => ({
    header: null
  })
}
});
export default createAppContainer(RootNavigator);
