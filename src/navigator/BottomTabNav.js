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
          iconName = `checkmark-circle-outline`;
        } else if (routeName === 'Room') {
          iconName = `bed`;
        } else if (routeName === 'Customer') {
          iconName = `people`;
        } else if (routeName === 'Settings') {
          iconName = `settings`;
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} color='white' />;
      },
    }),
    
    tabBarOptions: {
      
      activeBackgroundColor: '#D4af37',
      //inactiveBackgroundColor:'#3419ff', 
      activeTintColor: 'white',
      inactiveTintColor: '#D4af37',
      labelStyle: {
        fontFamily: 'Italianno-Regular-OTF',
        fontSize: 18
      },
    },
  }
);
export default createAppContainer(BottomTabNav);
