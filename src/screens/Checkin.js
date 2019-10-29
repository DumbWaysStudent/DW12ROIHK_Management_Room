import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage, SafeAreaView, FlatList } from 'react-native';
import { Card, List, Body, Button, CardItem, Left, Header, Content, Container, Item } from 'native-base';
import moment from "moment";

import { connect } from 'react-redux'
import * as actionOrders from './../redux/actions/actionOrders'

class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: '',
      data: [],
      param: [],
    };
  }

  async userData() {

    const param = {
      token: await AsyncStorage.getItem('token'),
    }

    await this.setState({ param: param })
    await this.getData()


  }
  async UNSAFE_componentWillMount() {
    this.userData()
  }

  async getData() {
    await this.props.handleGetCheckin(this.state.param)
    await this.setState({ data: this.props.orders.orders.data })

  }

  addOrder(item) {

    this.props.navigation.navigate('AddOrder', { room: item })
  }

  checkout(item) {
    this.props.navigation.navigate('Checkout', { room: item })
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.refreshData()
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  async refreshData() {
    await this.getData()
    console.log('here');
    const data = this.state.data
    for (let i = 0; i < this.state.data.length; i++) {
      if (data[i].order !== null) {
        if (moment(data[i].order.order_end_time).diff(moment(), 'm') <= 0)
          this.handleCheckout(data[i].order.id)
      }
    }
  }

  async handleCheckout(orderId) {
    const param = {
      token: this.state.param.token,
      order: orderId,
      data: {
        is_done: true,
        is_booked: false,
        duration: 0,
      }
    }
    await this.props.handleUpdateOrder(param)
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Text style={styles.title}> Checkin </Text>
        </Header>
        <Content style={{ width: Dimensions.get('window').width }}>
          <View style={styles.formAll}>
            <FlatList
              data={this.state.data}
              numColumns={3}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
                <Button
                  block light style={{
                    backgroundColor: item.order ? 'grey' : 'green',
                    margin: 5, width: 100, height: 70
                  }}
                  onPress={() => { item.order ? this.checkout(item) : this.addOrder(item) }}>
                  <Text style={{ alignSelf: 'center' }}>{item.room_name}</Text>
                </Button>
              } />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    //height: 500
  },
  Header: {
    backgroundColor: '#ff6e6e',
  },
  headerSlide: {
    height: 210,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    backgroundColor: '#ff6e6e',
  },
  formSearch: {
    marginVertical: 10
  },
  formFav: {
    padding: 3,
    backgroundColor: '#ff6e6e'
  },
  formAll: {
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center'

  },
  title: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  Slideshow: {
    width: 250,
  },
  favBtn: {
  },
  ListDiv: {
    backgroundColor: '#ff6e6e',
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
    handleGetCheckin: (param) => dispatch(actionOrders.handleGetCheckin(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkin);