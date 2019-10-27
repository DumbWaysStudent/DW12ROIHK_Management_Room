import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right } from 'native-base';

import { connect } from 'react-redux'
import * as actionCustomers from './../redux/actions/actionCustomers'


class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      identityNumber: '',
      phoneNumber: '',
      data: []
    };
  }

  async handleAddCustomer() {
    console.log('here')

    const param = {
      token: await AsyncStorage.getItem('token'),
      data: {
        name: this.state.name,
        identity_number: this.state.identityNumber,
        phone_number: this.state.phoneNumber,
      }


    }
    console.log('token');
    await this.props.handleAddCustomers(param)
    this.props.navigation.navigate('Customer')
  }


  render() {
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <View >
            <View style={[styles.marginTitle]}>
              <Text style={styles.subTitle}>Add Customer</Text>
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
                  onPress={() => this.handleAddCustomer()}>
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
    customer: state.customer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddCustomers: (param) => dispatch(actionCustomers.handleAddCustomers(param)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomer);
