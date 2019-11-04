import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, Dimensions } from 'react-native';
import { Item, Input, Button, Icon, Container, Content } from 'native-base';

import { connect } from 'react-redux'
import * as actionCustomers from './../redux/actions/actionCustomers'
import * as actionOrders from './../redux/actions/actionOrders'
import * as actionRooms from './../redux/actions/actionRooms'

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

      timePassed: false
    };
  }

  async loadingData() {
      const token = await AsyncStorage.getItem('token')
      console.log("token");
      if (token) {
        console.log('get data');

        const param = {
          token: token,
        }
        await this.props.handleGetCheckin(param)
        await this.props.handleGetCustomers(param)
        await this.props.handleGetRooms(param)
        this.props.navigation.setParams({ closeModal: null })
        
        
        this.props.navigation.navigate('BottomTabNav')
      } else {
        this.props.navigation.setParams({ refresh: true })
        this.props.navigation.navigate('Login')
      }
    

  }

  UNSAFE_componentWillMount() {
    //console.log('will');
    this.props.navigation.setParams({ refresh: false })
    this.loadingData()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.navigation.state.params.refresh == true) {
       // console.log('refresh');
        this.props.navigation.setParams({ refresh: false })
        this.loadingData()
    
    }
  }
  render() {

    return (
      <Container style={{
        backgroundColor: '#082640',
        width: Dimensions.get('window').width,
        alignContent: 'center', justifyContent: 'center'
      }}>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/DumbWaysStudent/DW12ROIHK_Management_Room/master/src/images/WhatsApp%20Image%202019-10-30%20at%2016.24.02.jpeg' }}
          style={{ flex: 0.5 }} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    customers: state.customers,
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetCheckin: (param) => dispatch(actionOrders.handleGetCheckin(param)),
    handleGetCustomers: (param) => dispatch(actionCustomers.handleGetCustomers(param)),
    handleGetRooms: (param) => dispatch(actionRooms.handleGetRooms(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);