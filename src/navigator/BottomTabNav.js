import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'native-base'

import Checkin from './../screens/Checkin'
import Room from './../screens/Room'
import Customer from './../screens/Customer'
import Settings from './../screens/Settings'


const BottomTabNav = createBottomTabNavigator(
  {
    Checkin: {
      screen: Checkin,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    Room: {
      screen: Room,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    Customer: {
      screen: Customer,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
   
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Checkin') {
          iconName = `square-outline`;
        } else if (routeName === 'Room') {
          iconName = `star-outline`;
        } else if (routeName === 'Customer') {
          iconName = `contact`;
      } else if (routeName === 'Setting') {
        iconName = `contact`;
      }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} color='white' />;
      },
    }),

    tabBarOptions: {
      activeBackgroundColor: '#ff6e6e',
      //inactiveBackgroundColor:'#3419ff', 
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
    },
  }
);
export default createAppContainer(BottomTabNav);
