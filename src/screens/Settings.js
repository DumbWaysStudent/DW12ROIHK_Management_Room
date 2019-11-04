import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Dimensions, Image } from 'react-native';
import { Button, CardItem, Left, Body, Thumbnail, Header, Container, Card, Item } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';


export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      image: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    };
  }
  async UNSAFE_componentWillMount() {
    const username = await AsyncStorage.getItem('userName')
    console.log(username);

    this.setState({ username })
  }
  async logOut() {
    await AsyncStorage.removeItem('token')
    this.props.navigation.setParams()
    this.props.navigation.navigate('Login', { refresh: true })
  }
  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient style={{width: Dimensions.get('window').width,}}
        colors={['#082641', '#202060']}>
          <Header style={styles.Header}>
            <Text style={styles.title}> Settings </Text>
          </Header>
        </LinearGradient>
        <View style={{ margin: 1 }}>
          <Card style={styles.Card}>
            

            <CardItem style={{backgroundColor: '#eee6bf7'}}
            thumbnail>
              <Body style={{ alignItems: 'center' }}>
                <Thumbnail source={{ uri: this.state.image }} />

                <Text style={{ fontFamily: 'BodoniFLF-Roman', fontSize: 17 }}
                >{this.state.username}</Text>
              </Body>
            </CardItem>
          <Item style={{ alignSelf: 'center' }}>
            <Button block small style={styles.Button}
              onPress={() => this.logOut()}>
              <Text style={{
                color: 'white',
                alignSelf: 'center',
                fontFamily: 'BodoniFLF-Roman',
                fontSize: 17
              }}> Log Out </Text>
            </Button>
          </Item>
          </Card>
          <View style={styles.logo}>
              <Image
                source={{ uri: 'https://raw.githubusercontent.com/DumbWaysStudent/DW12ROIHK_Management_Room/master/src/images/WhatsApp%20Image%202019-10-30%20at%2016.50.41(2).jpeg' }}
                style={{ height: 280, width: 280 }} />
            </View>

        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: '#F7F7F7'
    //height: 500
  },
  Header: {
    backgroundColor: 'transparent',
  },
  Button: {
    marginTop: 10,
    width: 100,
    backgroundColor: '#711f07',
  },
  logo: {
    alignItems: 'center',
    padding: 10,
    justifyContent: 'flex-end'
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
  Card: {
    backgroundColor: '#eee6bf',
    alignContent: 'center',
    alignSelf: 'center',
    width: '60%',
    height: '30%'
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