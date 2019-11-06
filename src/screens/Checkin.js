import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage, SafeAreaView, FlatList } from 'react-native';
import { Card, List, Body, Button, CardItem, Left, Header, Content, Container, Item, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
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
      time: null,
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
    moment()
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

  async componentDidMount() {
    this.interval = await setInterval(async () => {
      if (!this.props.orders.isLoading) {
        this.refreshData()
      }
      this.setState({time: moment()})
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  async refreshData() {
    const data = this.state.data
    for (let i = 0; i < data.length; i++) {
      if (data[i].order !== null) {
        if (moment(data[i].order.order_end_time).diff(moment(), 's') <= 0) {
          await this.handleCheckout(data[i].order.id)

        }
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
        //duration: 0,
      }
    }
    await this.props.handleUpdateOrder(param)
  }

  render() {
    if (this.props.orders.isSuccess && !this.props.orders.isLoading && this.props.orders.needRefresh) {
      this.getData()
    }
    if (this.props.rooms.isSuccess && !this.props.rooms.isLoading && this.props.rooms.needRefresh) {
      this.getData()
    }
    return (
      <Container style={styles.container}>
        <LinearGradient colors={['#082641', '#202060']}>
          <Header style={styles.Header}>
            <Text style={styles.title}> Checkin </Text>
          </Header>
        </LinearGradient>
        {
          this.props.rooms.isLoading ? <Spinner /> :
            <Content style={{ width: Dimensions.get('window').width }}>
              <View style={styles.formAll}>
                <FlatList
                  data={this.state.data}
                  numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) =>
                    <Button
                      block light style={{
                        backgroundColor: item.order ? '#eee6bf' : '#082641',
                        margin: 5, width: 100, height: 70
                      }}
                      onPress={() => { item.order ? this.checkout(item) : this.addOrder(item) }}>
                      <Body>
                        <Text style={{
                          alignSelf: 'center',
                          color: item.order ? 'black' : 'white',
                          fontFamily: 'Italianno-Regular-OTF',
                          fontSize: 24,
                          width: 28
                        }}>{item.room_name}</Text>
                        <Text style={{
                          alignSelf: 'center',
                          color: item.order ? 'black' : 'white',
                          fontFamily: 'Italianno-Regular-OTF',
                          fontSize: 18,
                          width: 60
                        }}
                        >{
                            item.order ?
                              `${moment(item.order.order_end_time).diff(moment(), 'm')} : ${moment(item.order.order_end_time).diff(moment(), 's')%60} left`
                              :
                              'Available'
                          }</Text>
                      </Body>
                    </Button>
                  } />
              </View>
            </Content>
        }
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
    backgroundColor: 'transparent',

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
    fontSize: 34,
    color: '#e4ab74',
    alignSelf: 'center',
    fontFamily: 'pinyon-script.regular'
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
    orders: state.orders,
    rooms: state.rooms
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