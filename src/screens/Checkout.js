import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right, Card, CardItem } from 'native-base';
import moment from "moment";
import LinearGradient from 'react-native-linear-gradient';

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
        <Card style={styles.innerContainer}>
          <LinearGradient style={styles.innerContainer}
            colors={['#f1c550', '#fff9e0', '#f1c550']}>
            <View >
              <View style={[styles.marginTitle]}>
                <Text style={styles.subTitle}>Checkin</Text>
              </View>
              <View>
                <Text style={styles.text}>Room Name</Text>
                <Item regular
                  style={styles.formItem}>
                  <Input disabled
                    style={{ fontFamily: 'BodoniFLF-Roman' }}
                    value={this.state.room_name}
                    onChangeText={(text) => this.setState({ room_name: text })}
                  />
                </Item >
                <Text style={styles.text}>Customer</Text>
                <Item regular
                  style={styles.formItem}>
                  <Input disabled
                    style={{ fontFamily: 'BodoniFLF-Roman' }}
                    value={this.state.customer}
                    onChangeText={(text) => this.setState({ customer: text })}
                  />
                </Item >
                <Text style={styles.text}>Duration (minutes)</Text>
                <Item regular
                  style={styles.formItem}>
                  <Input disabled
                    style={{ fontFamily: 'BodoniFLF-Roman' }}
                    value={this.state.duration}
                    onChangeText={(text) => this.setState({ duration: text })}
                  />
                </Item >
              </View>
              <CardItem style={{ backgroundColor: 'transparent' }}>
                <Item>
                  <Button block style={styles.ButtonCancel}
                    onPress={() => this.props.navigation.navigate('Checkin')}>
                    <Text style={{ color: 'black', fontFamily: 'BodoniFLF-Roman', fontSize: 16 }}>Cancel</Text></Button>
                  <Button block
                    style={styles.Button}
                    onPress={() => this.handleCheckout()}>
                    <Text style={{ color: '#ffffff', fontFamily: 'BodoniFLF-Roman', fontSize: 16 }}>Checkout</Text></Button>
                </Item>
              </CardItem>
            </View>
          </LinearGradient>
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  innerContainer: {
    alignSelf: 'center',
    width: 320,
    height: 390,
    paddingHorizontal: 10
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
    fontSize: 32,
    fontFamily: 'Italianno-Regular-OTF',
  },
  text: {
    //color: 'white',
    fontFamily: 'Italianno-Regular-OTF',
    fontSize: 18,
  },
  subTitle: {
    fontSize: 40,
    //color: 'white',
    fontFamily: 'Italianno-Regular-OTF',

  },
  box: {
    //borderColor: 'white',

  },
  formItem: {
    marginBottom: 10,
    //borderColor: 'white'
  },
  Button: {
    width: 130,
    height: 40,
    backgroundColor: '#711f07'
  },
  ButtonCancel: {
    width: 130,
    height: 40,
    backgroundColor: '#ffff'
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
