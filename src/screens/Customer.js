import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage, SafeAreaView, FlatList } from 'react-native';
import {
  Card, List, Body, Button, CardItem, Spinner,
  Left, Header, Content, Container, Item, Right, Thumbnail, Fab, Icon
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient';
//import { CachedImage } from 'react-native-cached-image';


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
    this.props.navigation.navigate('AddCustomer', { prevScreen: 'Customer' })
    // await this.props.handleAddRooms(this.state.param)
  }
  editCustomer(item) {
    this.props.navigation.navigate('EditCustomer', { customer: item })
  }

  render() {
    if (this.props.customers.isSuccess && !this.props.customers.isLoading && this.props.customers.needRefresh) {
      this.getData()
    }
    return (
      <Container style={styles.container}>
        <LinearGradient style={{ width: Dimensions.get('window').width, }}
          colors={['#082641', '#202060']}>
          <Header style={styles.Header}>
            <Text style={styles.title}> Customer </Text>
          </Header>
        </LinearGradient>
        <Content>
          {
            this.props.customers.isLoading ? <Spinner /> :
              <View style={styles.formAll}>
                <FlatList
                  data={this.props.customers.customers.data}
                  //keyExtractor={item => item.id}
                  renderItem={({ item }) =>
                    <Card style={{ alignItems: 'center', width: 300 }}>
                      <LinearGradient style={{ alignItems: 'center', width: 300 }}
                        colors={['#dadada', '#fff7f7']}>
                        <CardItem style={{ backgroundColor: 'transparent' }}
                          button onPress={() => this.editCustomer(item)}>
                          <Left>
                            <Thumbnail source={{ uri: item.image }} />
                            <Body style={{ alignItems: 'flex-start' }}>
                              <Text style={styles.Text}>Name : {item.name} </Text>
                              <Text style={styles.Text}>Identity Number : {item.identity_number} </Text>
                              <Text style={styles.Text}>Phone Number : {item.phone_number} </Text>
                            </Body>
                          </Left>
                        </CardItem>
                      </LinearGradient>
                    </Card>
                  } />
              </View>
          }
        </Content>
        <Fab
          style={{ backgroundColor: '#711f07' }}
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
    //flex: 1,
    //height: 500
  },
  Header: {
    backgroundColor: 'transparent',
  },
  formAll: {
    marginTop: 10,
    alignItems: 'center',
    // height: 500,
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
  Text: {
    fontFamily: 'Italianno-Regular-OTF',
    fontSize: 20
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