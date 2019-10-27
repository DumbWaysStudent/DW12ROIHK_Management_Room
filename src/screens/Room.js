import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage, SafeAreaView, FlatList } from 'react-native';
import { Card, List, Body, Button, CardItem, Left, Header, Content, Container, Item } from 'native-base'

import { connect } from 'react-redux'
import * as actionRooms from './../redux/actions/actionRooms'

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      param: [],
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
    await this.props.handleGetRooms(this.state.param)
    await this.setState({ data: this.props.rooms.rooms.data })
  }

  AddRooms() {
    this.props.navigation.navigate('AddRoom')
  }
  editRoom(item) {
    this.props.navigation.navigate('EditRooms', { room: item })
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Text style={styles.title}> Room </Text>
        </Header>
        <Content style={{ width: Dimensions.get('window').width }}>
          <View style={styles.formAll}>
            <FlatList
              data={this.state.data}
              numColumns={3}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
                  <Button block light style={{margin: 5, width:100, height:70}}
                   onPress={() => this.editRoom(item)}>
                    <Text style={{alignSelf:'center'}}>{item.room_name}</Text>
                  </Button>
              } />
              <Item style={{alignSelf:'center'}}>
            <Button block small style={{marginTop: 20,  width: 100, height: 40 }}
              onPress={() => this.AddRooms()}>
              <Text style={{ color: '#ffffff' }}> Add Room </Text>
            </Button>
            </Item>
          </View>
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

const mapStateToProps = state => {
  return {
    rooms: state.rooms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetRooms: (param) => dispatch(actionRooms.handleGetRooms(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);