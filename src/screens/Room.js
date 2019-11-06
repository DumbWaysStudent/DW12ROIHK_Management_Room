import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage, SafeAreaView, FlatList, Modal, ImageBackground } from 'react-native';
import { Card, List, Body, Button, CardItem, Left, Header, Content, Container, Item, Spinner } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux'
import * as actionRooms from './../redux/actions/actionRooms'
import AddRoom from './AddRoom'

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
      ],
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    //this.props.navigation.setParams({ closeModal: true })
    this.setState({ modalVisible: visible });
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
    //this.props.navigation.setParams({ closeModal: null })
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

  //   UNSAFE_componentWillReceiveProps(nextProps) {
  //     console.log('nextProps');
  //     console.log(nextProps.navigation.getParam('closeModal'));
  //     if (this.props.navigation.getParam('closeModal') == true) {
  //       console.log('roomModal')
  //       this.setState({ modalVisible: !this.state.modalVisible })
  //       this.props.navigation.setParams({ closeModal: false })
  //   }
  // }
  render() {
    if (this.props.rooms.isSuccess && !this.props.rooms.isLoading && this.props.rooms.needRefresh) {
      this.getData()
    }
    return (
      <Container style={styles.container}>
        <LinearGradient style={{ width: Dimensions.get('window').width, }}
          colors={['#082641', '#202060']}>
          <Header style={styles.Header}>
            <Text style={styles.title}> Room </Text>
          </Header>
        </LinearGradient>
        {
          this.props.rooms.isLoading ? <Spinner /> :
            <Content style={{ width: Dimensions.get('window').width }}>
              <View style={styles.formAll}>
                <FlatList
                  data={this.state.data}
                  numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) =>
                    <Button block light style={styles.room}
                      onPress={() => this.editRoom(item)}>
                      <Text style={{
                        alignSelf: 'center',
                        color: 'white',
                        fontFamily: 'Italianno-Regular-OTF',
                        fontSize: 24,
                        width: 30
                      }}>{item.room_name}</Text>
                    </Button>
                  } />
                <Item style={{ alignSelf: 'center' }}>
                  <Button block small style={styles.Button}
                    onPress={() => this.AddRooms()}>
                    <Text style={{ color: '#ffffff', fontFamily: 'BodoniFLF-Roman', fontSize: 17 }}> Add Room </Text>
                  </Button>
                </Item>
              </View>
            </Content>
        }
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
    backgroundColor: 'transparent',
  },
  room: {
    margin: 5,
    width: 100,
    height: 70,
    backgroundColor: '#082641',
  },
  Button: {
    marginTop: 20,
    marginBottom: 10,
    width: 100,
    height: 40,
    backgroundColor: '#711f07'
  },
  formAll: {
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center'

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