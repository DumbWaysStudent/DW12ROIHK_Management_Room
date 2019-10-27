import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right } from 'native-base';

import { connect } from 'react-redux'
import * as actionCustomers from '../redux/actions/actionCustomers'


class EditCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      identityNumber: '',
      phoneNumber: '',
      customerId: '',
      data: []
    };
  }


  async handleUpdateCustomer() {
    const param = {
      token: await AsyncStorage.getItem('token'),
      customer: this.state.customerId,
      data: {
        name: this.state.name,
        identity_number: this.state.identityNumber,
        phone_number: this.state.phoneNumber,
      }
    }
    
    
    await this.props.handleUpdateCustomers(param)
    this.props.navigation.navigate('Customer')
  }

  async handleDeleteCustomer() {
    const param = {
      token: await AsyncStorage.getItem('token'),
      customer: this.state.customerId,
    }
    console.log(param);
    await this.props.handleDeleteCustomers(param)
    this.props.navigation.navigate('Customer')
  }



  UNSAFE_componentWillMount() {
    this.setState({ name: this.props.navigation.state.params.customer.name })
    this.setState({ identityNumber: this.props.navigation.state.params.customer.identity_number })
    this.setState({ phoneNumber: this.props.navigation.state.params.customer.phone_number })
    this.setState({ customerId: this.props.navigation.state.params.customer.id })
  }

  UNSAFE_componentWillReceiveProps(nexProps) {
    if (nexProps.navigation.state.params.customer !== this.props.navigation.state.params.customer) {
      this.setState({ name: this.props.navigation.state.params.customer.name })
      this.setState({ identityNumber: this.props.navigation.state.params.customer.identity_number })
      this.setState({ phoneNumber: this.props.navigation.state.params.customer.phone_number })
      this.setState({ customerId: this.props.navigation.state.params.customer.id })
    }
  }


  render() {

    const { label, icon, onChange } = this.props;
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <View >
            <View style={[styles.marginTitle]}>
              <Text style={styles.subTitle}>Edit Room</Text>
            </View>
            <View>
              <Text style={styles.text}>Customer Name</Text>
              <Item regular
                style={styles.formItem}>
                <Input
                  value={this.state.name}
                  onChangeText={(text) => this.setState({ name: text })}
                />
              </Item >
              <Text style={styles.text}>Identity Number</Text>
              <Item regular
                style={styles.formItem}>
                <Input
                  value={this.state.identityNumber}
                  onChangeText={(text) => this.setState({ identityNumber: text })}
                />
              </Item >
              <Text style={styles.text}>Phone Number</Text>
              <Item regular
                style={styles.formItem}>
                <Input
                  value={this.state.phoneNumber}
                  onChangeText={(text) => this.setState({ phoneNumber: text })}
                />
              </Item >
            </View>
            <Item>
              <Left>
                <Button block rounded light
                  onPress={() => this.props.navigation.navigate('Customer')}>
                  <Text style={{ color: 'black' }}>Cancel</Text></Button>
              </Left>
              <Right>
                <Button block rounded light danger
                  onPress={() => this.handleUpdateCustomer()}>
                  <Text style={{ color: '#ffffff' }}>Edit</Text></Button>
              </Right>
            </Item>
            <Button block rounded light danger
              style={styles.marginSubTitle}
              onPress={() => this.handleDeleteCustomer()}>
              <Text style={{ color: '#ffffff' }}>Delete</Text></Button>
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
    customers: state.customers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleUpdateCustomers: (param) => dispatch(actionCustomers.handleUpdateCustomers(param)),
    handleDeleteCustomers: (param) => dispatch(actionCustomers.handleDeleteCustomers(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCustomer);
