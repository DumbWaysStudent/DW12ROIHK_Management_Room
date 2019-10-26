import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import {Button, CardItem, Left, Body, Thumbnail, Header, Container} from 'native-base';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
    };
  }
async componentWillMount(){
 const username=  await AsyncStorage.getItem('username')
 console.log(username);
 
 this.setState({username})
}
  render() {
    return (
      <Container>
      <Header>
        <Text> Settings </Text>
      </Header>
      <View>
        <CardItem thumbnail>
      <Left>
        
          <Thumbnail square source={{ uri: 'url' }} />
       
        <Body>
          <Text >{this.state.username}</Text>
          <Button onPress={() => alert('here')}></Button>
        </Body>
      </Left>
    </CardItem>
      </View>
      </Container>
    );
  }
}
