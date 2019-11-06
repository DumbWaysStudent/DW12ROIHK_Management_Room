import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container, Content } from 'native-base';

import { connect } from 'react-redux'
import * as actionUsers from './../redux/actions/actionUsers'

//create manager mode


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      icon: 'eye-off',
      passMode: true
    };
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
      
      this.props.navigation.navigate('LoadingScreen', { refresh: true })
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

  componentDidMount() {
    this.props.navigation.setParams({ refresh: true })
  }



  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View >
            <View style={[styles.marginTitle]}>
              <Image
                source={{ uri: 'https://raw.githubusercontent.com/DumbWaysStudent/DW12ROIHK_Management_Room/master/src/images/WhatsApp%20Image%202019-10-30%20at%2016.24.02.jpeg' }}
                style={{ height: 180, width: 180 }} />
              <Text style={styles.title}>Front Desk</Text>
            </View>
            <View>
              <Text style={styles.text}>Username</Text>
              <Item regular
                style={styles.formItem}>
                <Input style={{fontFamily: 'BodoniFLF-Roman', fontSize: 20 }}
                  value={this.state.username}
                  onChangeText={(text) => this.setState({ username: text })}
                />
              </Item >
              <Text style={styles.text}>Password</Text>
              <Item regular
                style={styles.formItem}>
                <Input style={{fontFamily: 'BodoniFLF-Roman', fontSize: 20 }}
                  secureTextEntry={this.state.passMode}
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                  keyboardType='default' />
                <Icon name={this.state.icon} onPress={() => this.modeIcon()} />
              </Item>
              <Button block style={styles.Button}
                onPress={() => this.handleLogin(this.state.email)}>
                <Text style={{ color: '#ffffff', fontFamily: 'BodoniFLF-Roman', fontSize: 20 }}>LogIn</Text></Button>

            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    backgroundColor: '#082640'
  },
  marginTitle: {
    alignItems: 'center',
    padding: 10
  },
  marginSubTitle: {
    marginTop: 80,
    marginBottom: 30
  },
  title: {
    marginTop: 20,
    fontSize: 65,
    color: '#e4ab74',
    fontFamily: 'pinyon-script.regular'
  },
  text: {
    color: '#e4ab74',
    fontFamily: 'BodoniFLF-Roman', fontSize: 20 
  },
  subTitle: {
    fontSize: 20,
    color: '#e4ab74'
  },
  Button: {
    backgroundColor: '#711f07'
  },
  formItem: {
    marginBottom: 10,
    backgroundColor: '#eee6bf',
    
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
