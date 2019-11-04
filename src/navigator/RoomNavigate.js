import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Room from '../screens/Room'
import AddRoom from '../screens/AddRoom'
import EditRoom from '../screens/EditRooms'

import AddCustomer from '../screens/AddCustomer'
import EditCustomer from '../screens/EditCustomer'
import AddOrder from '../screens/AddOrder'
import Checkout from '../screens/Checkout'

//import ScreenTest from './../screens/ScreenTest';

// without Bottom Tab Navigator
const RoomNavigate = createStackNavigator({
    Room: {
        screen: Room,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    AddRoom: {
        screen: AddRoom,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    }
},
    {
        headerMode: 'none',
        mode: 'modal',
        transparentCard: true,
        cardStyle:{
            backgroundColor:"transparent",
            opacity:0.99
        }
       
        // navigationOptions: {
        //     cardStack: {
        //         gesturesEnabled: true,
        //     },
        // },

    }
);

export default createAppContainer(RoomNavigate);