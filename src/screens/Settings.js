import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Dimensions } from 'react-native';
import { Button, CardItem, Left, Body, Thumbnail, Header, Container, Card, Item } from 'native-base';

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
  async logOut(){
    await AsyncStorage.removeItem('token')
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <Container>
        <Header>
          <Text style={styles.title}> Settings </Text>
        </Header>
        <View style={{margin: 3}}>
          <Card>
          <CardItem thumbnail>
            <Left>
              <Thumbnail source={{ uri: this.state.image }} />
              <Body>
                <Text >{this.state.username}</Text>
              </Body>
            </Left>
          </CardItem>
          
          </Card>
          <Item style={{alignSelf: 'center'}}>
          <Button block small style={{ marginTop: 20, width:100}}
          onPress={() => this.logOut()}>
            <Text style={{color:'white', alignSelf: 'center'}}> Log Out </Text>
          </Button>
          </Item>
        </View>
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
    alignSelf: 'center'

  },
  title: {
    fontSize: 24,
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