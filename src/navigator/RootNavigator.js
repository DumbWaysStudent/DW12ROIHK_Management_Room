import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import StackNavigator from './StackNavigator'
import BottomTabNav from './BottomTabNav'

const RootNavigator = createStackNavigator({
  StackNavigator:{
    screen: StackNavigator,
  navigationOptions: ({ navigation }) => ({
    header: null
  })
},
  BottomTabNav:{
    screen: BottomTabNav,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});
export default createAppContainer(RootNavigator);
