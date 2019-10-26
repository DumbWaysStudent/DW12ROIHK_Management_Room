import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container } from 'native-base';

import { connect } from 'react-redux'
import * as actionUsers from './../redux/actions/actionUsers'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin@gmail.com',
      password: 'rahasia',
      icon: 'eye-off',
      passMode: true
    };
  }

  validate = (text) => {
    //  this.setState({ username: text })
      this.handleLogin()
  }

  modeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      passMode: !prevState.passMode
    }));
  }


  async handleLogin() {
    let data = { username: this.state.username, password: this.state.password }
    await this.props.handlePostUsers(data)
    const dataUser = this.props.usersLocal.users.data
    //alert(dataUser.user.id)
    if (dataUser.token) {
      await AsyncStorage.multiSet([
        ['token', dataUser.token],
        ['userName', dataUser.username]
      ])
      // await AsyncStorage.setItem('userId', this.props.usersLocal.users.data.user.id)
      this.props.navigation.navigate('BottomTabNav')
      //alert('here')
    } else {
      alert(this.props.usersLocal.users.data.message)
    }

  }

  demo() {
    this.setState({ password: 'rahasia' })
    this.setState({ username: 'admin@gmail.com' })
  }

  async passLogin() {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      this.props.navigation.navigate('BottomTabNav')
    }
  }

  // componentDidMount() {
  //   this.passLogin()
  // }



  render() {
    const { label, icon, onChange } = this.props;
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <View >
            <View style={[styles.marginTitle]}>
              <Text style={styles.subTitle}>Login admin</Text>
            </View>
            <View>
              <Text style={styles.text}>username</Text>
              <Item regular
                style={styles.formItem}>
                <Input
                  value={this.state.username}
                  onChangeText={(text) => this.setState({ username: text })}
                   />
              </Item >
              <Text style={styles.text}>Password</Text>
              <Item regular
                style={styles.formItem}>
                <Input
                  secureTextEntry={this.state.passMode}
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                  keyboardType='default' />
                <Icon name={this.state.icon} onPress={() => this.modeIcon()} />
              </Item>
              <Button block rounded light danger
                onPress={() => this.validate(this.state.email)}>
                <Text style={{ color: '#ffffff' }}>LogIn</Text></Button>
              
            </View>
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
  box:{
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
    usersLocal: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handlePostUsers: (data) => dispatch(actionUsers.handlePostUsers(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
