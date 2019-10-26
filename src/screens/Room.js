import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage, SafeAreaView } from 'react-native';
import { Card, List, Body, Button, CardItem, Left, Header, Content, Container } from 'native-base'

import { connect } from 'react-redux'
import * as actionRooms from './../redux/actions/actionRooms'

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      param:[],
      room: [
        {
          name: 'A1',
          id: 1,
        },
        {
          name: 'A2',
          id: 2,
        }
      ]
    };
  }

  async userData() {
    
    console.log('here');
    const param = {
      token: await AsyncStorage.getItem('token'),
     // user: await AsyncStorage.getItem('userId')
    }

    await this.setState({ param: param })
    await this.getData()
    
    
  }
 async componentWillMount(){
    this.userData()
  }

  async getData() {
    
    await this.props.handleGetRooms(this.state.param)
    
    await console.log(this.props.rooms.rooms.data);
    await this.setState({ data: this.props.rooms.rooms.data })
  }

  async AddRooms(){
    await this.props.handleAddRooms(this.state.param)
  }

  render() {
    return (
      <Container style={styles.container}>
      <Header>
        <Text> Room </Text>
      </Header>
      <Content style={{alignSelf: 'center', width: 300, height:50}}>
       <List style={styles.formAll}
          dataArray={this.state.data}
          renderRow={(item) =>
            <Card style={{alignContent: 'center', width: 300, height:50}}
            onPress={() => alert('here')}>
              <CardItem>
              <Text>{item.room_name}</Text>
              </CardItem>
            </Card>
          }>
        </List>
        <Button block small
                onPress={() => this.AddRooms()}>
                <Text style={{ color: '#ffffff' }}> Add Room </Text>
              </Button>
      </Content>
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
    width: 250,

  },
  title: {
    height: 22,
    fontSize: 20,
    color: 'white'
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
    rooms: state.rooms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddRooms: (param) => dispatch(actionRooms.handleAddRooms(param)),
    handleGetRooms: (param) => dispatch(actionRooms.handleGetRooms(param)),
    handleUpdateRooms: (param) => dispatch(actionRooms.handleUpdateRooms(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);