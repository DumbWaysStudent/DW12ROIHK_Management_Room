import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground, FlatList, Picker } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right, Body, CardItem, Card, Spinner } from 'native-base';
import moment from "moment";
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux'
import * as actionOrders from './../redux/actions/actionOrders'
import * as actionCustomers from './../redux/actions/actionCustomers'


class AddOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room_name: '',
      roomId: '',
      duration: 0,
      data: [],
      selected: 2,
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  async handleAddOrder() {
    console.log(this.state.duration)

    const param = {
      token: await AsyncStorage.getItem('token'),
      data: {
        room_id: this.state.roomId,
        customer_id: this.state.selected,
        is_done: false,
        is_booked: true,
        duration: Number(this.state.duration),
        order_end_time: new moment().add(Number(this.state.duration), 'm').toJSON()
      }

    }
    await this.props.handleAddOrder(param)
    this.props.navigation.navigate('Checkin')


  }
  async userData() {

    const param = {
      token: await AsyncStorage.getItem('token'),
    }

    await this.setState({ param: param })
    await this.getData()


  }

  async getData() {
    await this.props.handleGetCustomers(this.state.param)
    await this.setState({ data: this.props.customers.customers.data })
    await console.log('customers');

    await console.log(this.state.data);

  }


  async UNSAFE_componentWillMount() {
    let data = this.props.navigation.state.params.room
    this.setState({ room_name: data.room_name })
    this.setState({ roomId: data.id })
    this.setState({ duration: 0 })

    await this.userData()

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.room !== this.props.navigation.state.params.room) {
      let data = nextProps.navigation.state.params.room
      this.setState({ room_name: data.room_name })
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
                <Text style={styles.title}>Checkin</Text>
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
                <Item>
                  <Left>
                    <Text style={styles.text}>Customer</Text>
                  </Left>
                  <Right>
                    <Item
                      onPress={() => this.props.navigation.navigate('AddCustomer', { prevScreen: 'AddOrder' })}>
                      <Text style={{ fontFamily: 'BodoniFLF-Roman' }}> Add  </Text><Icon name='add' />
                    </Item>
                  </Right>
                </Item>
                <Item regular
                  style={styles.formItem}>
                  {
                    this.props.customers.isLoading ? <Spinner style={{ height: 40 }} /> :
                      <Picker
                        textStyle={{ fontFamily: 'BodoniFLF-Roman' }}
                        mode="dropdown"
                        style={{ width: 300, height: 40 }}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                        itemStyle={{ fontFamily: 'BodoniFLF-Roman' }}
                      >
                        {this.state.data.map((data, i) => {
                          return (
                            <Picker.Item
                              label={data.name} value={data.id} key={i} />
                          );
                        }
                        )}
                      </Picker>
                  }
                </Item >
                <Text style={styles.text}>Duration (minutes)</Text>
                <Item regular
                  style={styles.formItem}>
                  <Input
                    style={{ fontFamily: 'BodoniFLF-Roman' }}
                    value={this.state.duration}
                    onChangeText={(text) => this.setState({ duration: text })}
                    keyboardType={"number-pad"}
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
                    onPress={() => this.handleAddOrder()}>
                    {
                      this.props.orders.isLoading ? <Spinner style={{ height: 16 }} /> :
                        <Text style={{ color: '#ffffff', fontFamily: 'BodoniFLF-Roman', fontSize: 16 }}>Add</Text>
                    }
                  </Button>
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
    height: 370,
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
    backgroundColor: '#fff0bc',
    borderWidth: 2,
    borderColor: '#ffc60b'
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
    orders: state.orders,
    customers: state.customers,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddOrder: (param) => dispatch(actionOrders.handleAddOrder(param)),
    handleGetCustomers: (param) => dispatch(actionCustomers.handleGetCustomers(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrder);
