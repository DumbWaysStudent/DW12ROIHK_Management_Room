import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right } from 'native-base';
import moment from "moment";

import { connect } from 'react-redux'
import * as actionOrders from '../redux/actions/actionOrders'


class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room_name: '',
      customer: '',
      duration: '',
      order_end_time: '',
      orderId: '',
      customerId: '',
      roomId: '',
      data: []
    };
  }

  async handleCheckout() {
    console.log('here')

    const param = {
      token: await AsyncStorage.getItem('token'),
      order: this.state.orderId,
      data: {
        customer_id: this.state.customerId,
        room_id: this.state.roomId,
        is_done: true,
        is_booked: false,
        duration: this.state.duration,
      }
    }
    console.log(param);
    await this.props.handleUpdateOrder(param)
    this.props.navigation.navigate('Checkin')
  }

  UNSAFE_componentWillMount() {
    let now = moment()
    let data = this.props.navigation.state.params.room
    const order_end_time = moment(data.order.order_end_time)
    this.setState({ room_name: data.room_name })
    this.setState({ customer: `${data.order.customer.name} ${data.order.customer.phone_number}` })
    this.setState({ duration: `${order_end_time.diff(now, 'm')}` })
    this.setState({ order_end_time: order_end_time })
    this.setState({ orderId: data.order.id })
    this.setState({ customerId: data.order.customer.id })
    this.setState({ roomId: data.id })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let now = moment()
    if (nextProps.navigation.state.params.room !== this.props.navigation.state.params.room) {
      let data = nextProps.navigation.state.params.room
      const order_end_time = moment(data.order.order_end_time)
      this.setState({ room_name: data.room_name })
      this.setState({ customer: `${data.order.customer.name} ${data.order.customer.phone_number}` })
      this.setState({ duration: `${order_end_time.diff(now, 'm')}` })
      this.setState({ order_end_time: order_end_time })
      this.setState({ orderId: data.order.id })
      this.setState({ customerId: data.order.customer.id })
      this.setState({ roomId: data.id })
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <View >
            <View style={[styles.marginTitle]}>
              <Text style={styles.subTitle}>Checkin</Text>
            </View>
            <View>
              <Text style={styles.text}>Room Name</Text>
              <Item regular
                style={styles.formItem}>
                <Input disabled
                  value={this.state.room_name}
                  onChangeText={(text) => this.setState({ room_name: text })}
                />
              </Item >
              <Text style={styles.text}>Customer</Text>
              <Item regular
                style={styles.formItem}>
                <Input disabled
                  value={this.state.customer}
                  onChangeText={(text) => this.setState({ customer: text })}
                />
              </Item >
              <Text style={styles.text}>Duration (minutes)</Text>
              <Item regular
                style={styles.formItem}>
                <Input disabled
                  value={this.state.duration}
                  onChangeText={(text) => this.setState({ duration: text })}
                />
              </Item >
            </View>
            <Item>
              <Left>
                <Button block rounded light
                  onPress={() => this.props.navigation.navigate('Checkin')}>
                  <Text style={{ color: 'black' }}>Cancel</Text></Button>
              </Left>
              <Right>
                <Button block rounded light danger
                  onPress={() => this.handleCheckout()}>
                  <Text style={{ color: '#ffffff' }}>Checkout</Text></Button>
              </Right>
            </Item>
          </View>
        </SafeAreaView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    //backgroundColor: 'skyblue'
  },
  marginTitle: {
    alignItems: 'center',
    padding: 10
  },
  marginSubTitle: {
    marginTop: 80,
    marginBottom: 60
  },
  title: {
    fontSize: 50
  },
  text: {
    //color: 'white',
  },
  subTitle: {
    fontSize: 20,
    //color: 'white',
  },
  box: {
    //borderColor: 'white',

  },
  formItem: {
    marginBottom: 10,
    //borderColor: 'white'
  },
  TextMode: {
    color: 'blue',
  },
  Text: {
    marginTop: 20,
    alignSelf: 'center',
  }
})



const mapStateToProps = state => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleUpdateOrder: (param) => dispatch(actionOrders.handleUpdateOrder(param)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
