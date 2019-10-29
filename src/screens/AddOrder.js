import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground, FlatList, Picker } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right } from 'native-base';
import moment from "moment";

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
    console.log('here')

    const param = {
      token: await AsyncStorage.getItem('token'),
      data: {
        room_id: this.state.roomId,
        customer_id: this.state.selected,
        is_done: false,
        is_booked: true,
        duration: Number(this.state.duration),
        order_end_time: moment().add(Number(this.state.duration), 'm')
      }

    }
    console.log(param);
    await this.props.handleAddOrder(param)
    this.setState({duration: 0})
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
              <Item>
                <Left>
                <Text style={styles.text}>Customer</Text>
                </Left>
                <Right>
                  <Item onPress={()=> this.props.navigation.navigate('AddCustomer', {prevScreen: 'AddOrder'})}>
                  <Text> Add  </Text><Icon name='add' />
                  </Item>
                </Right>
              </Item>
              <Item regular
                style={styles.formItem}>
                <Picker
                  mode="dropdown"
                  style={{ width: 340, height: 40 }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  {this.state.data.map((data, i) => {
                    return (
                      <Picker.Item label={data.name} value={data.id} key={i} />
                    );
                  }
                  )}
                </Picker>
              </Item >
              <Text style={styles.text}>Duration (minutes)</Text>
              <Item regular
                style={styles.formItem}>
                <Input
                  value={this.state.duration}
                  onChangeText={(text) => this.setState({ duration: text })}
                  keyboardType={"number-pad"}
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
                  onPress={() => this.handleAddOrder()}>
                  <Text style={{ color: '#ffffff' }}>Add</Text></Button>
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
    order: state.order,
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
