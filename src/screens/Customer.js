import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage, SafeAreaView, FlatList } from 'react-native';
import {
  Card, List, Body, Button, CardItem,
  Left, Header, Content, Container, Item, Right, Thumbnail, Fab, Icon
} from 'native-base'

import { connect } from 'react-redux'
import * as actionCustomers from './../redux/actions/actionCustomers'

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      param: [],
    };
  }

  async userData() {

    const param = {
      token: await AsyncStorage.getItem('token'),
      // user: await AsyncStorage.getItem('userId')
    }

    await this.setState({ param: param })
    await this.getData()


  }
  async UNSAFE_componentWillMount() {
    this.userData()
  }

  async getData() {
    await this.props.handleGetCustomers(this.state.param)
    await this.setState({ data: this.props.customers.customers.data })
    console.log(this.state.data);

  }

  AddCustomers() {
    this.props.navigation.navigate('AddCustomer',{prevScreen: 'Customer'})
    // await this.props.handleAddRooms(this.state.param)
  }
  editCustomer(item) {
    this.props.navigation.navigate('EditCustomer', { customer: item })
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Text style={styles.title}> Customer </Text>
        </Header>
          <View style={styles.formAll}>
            <FlatList
              data={this.state.data}
              //keyExtractor={item => item.id}
              renderItem={({ item }) =>
                <Card style={{ alignItems: 'center', width: 300 }}>
                  <CardItem button onPress={() => this.editCustomer(item)}>
                    <Left>
                      <Thumbnail source={{ uri: item.image }} />
                      <Body style={{ alignItems: 'flex-start' }}>
                        <Text>Name : {item.name} </Text>
                        <Text>Identity Number : {item.identity_number} </Text>
                        <Text>Phone Number : {item.phone_number} </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              } />
          </View>
        <Fab
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.AddCustomers()}>
            <Icon name="add" />
          </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
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
    // height: 500,
  },
  title: {
    fontSize: 20,
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
    customers: state.customers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetCustomers: (param) => dispatch(actionCustomers.handleGetCustomers(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);