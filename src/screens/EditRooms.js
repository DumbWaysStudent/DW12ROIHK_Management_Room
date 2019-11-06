import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right, CardItem, Card, Body, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux'
import * as actionRooms from '../redux/actions/actionRooms'


class EditRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room_name: '',
      roomId: '',
      isLoadingEdit: false,
      isLoadingDelete: false,
      data: []
    };
  }


  async handleUpdateRoom() {
    const param = {
      token: await AsyncStorage.getItem('token'),
      room: this.state.roomId,
      data: {
        room_name: this.state.room_name,
      }
    }
    this.props.handleUpdateRooms(param)
    this.props.navigation.navigate('Room')
  }

  async handleDeleteRoom() {
    const param = {
      token: await AsyncStorage.getItem('token'),
      room: this.state.roomId,
    }
    await this.props.handleDeleteRooms(param)
    this.props.navigation.navigate('Room')
  }



  UNSAFE_componentWillMount() {
    this.setState({ room_name: this.props.navigation.state.params.room.room_name })
    this.setState({ roomId: this.props.navigation.state.params.room.id })
  }

  UNSAFE_componentWillReceiveProps(nexProps) {
    if (nexProps.navigation.state.params.room !== this.props.navigation.state.params.room) {
      this.setState({ room_name: nexProps.navigation.state.params.room.room_name })
      this.setState({ roomId: nexProps.navigation.state.params.room.id })
    }
  }


  render() {
    return (
      <Container style={styles.container}>
        <Card style={styles.innerContainer}>
          <LinearGradient style={styles.innerContainer}
            colors={['#f1c550', '#fff9e0', '#f1c550']}>
            <View style={[styles.marginTitle]}>
              <Text style={styles.subTitle}>Edit Room</Text>
            </View>
            <View>
              <Text style={styles.text}>Room Name</Text>
              <Item regular
                style={styles.formItem}>
                <Input style={{ fontFamily: 'BodoniFLF-Roman' }}
                  value={this.state.room_name}
                  onChangeText={(text) => this.setState({ room_name: text })}
                />
              </Item >
            </View>
            <CardItem style={{ backgroundColor: 'transparent' }}>
              <Item
                style={{ borderColor: 'transparent' }}>
                <Button block light
                  style={styles.ButtonCancel}
                  onPress={() => this.props.navigation.navigate('Room')}>
                  <Text style={{ color: 'black', fontFamily: 'BodoniFLF-Roman', fontSize: 16 }}>Cancel</Text></Button>
                <Button block style={styles.Button}
                  onPress={() => this.handleUpdateRoom()}>
                  {
                    this.state.isLoadingEdit ? <Spinner style={{ height: 16 }} /> :
                      <Text style={{ color: '#ffffff', fontFamily: 'BodoniFLF-Roman', fontSize: 16 }}>Edit</Text>
                  }
                </Button>
              </Item>
            </CardItem>
            <Body>
              <Button block style={styles.Button}
                onPress={() => this.handleDeleteRoom()}>
                <Text style={{ color: '#ffffff', fontFamily: 'BodoniFLF-Roman', fontSize: 16 }}>Delete</Text>
              </Button>
            </Body>
          </LinearGradient>
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  innerContainer: {
    alignSelf: 'center',
    width: 320,
    height: 300,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  marginTitle: {
    alignItems: 'center',
    padding: 10,
  },
  delete: {
    alignSelf: 'center',
    width: 230
  },
  title: {
    fontSize: 50
  },
  text: {
    //color: 'white',
    fontFamily: 'Italianno-Regular-OTF',
    fontSize: 20
  },
  subTitle: {
    fontSize: 32,
    //color: 'white',
    fontFamily: 'Italianno-Regular-OTF'
  },
  box: {
    //borderColor: 'white',

  },
  formItem: {
    marginBottom: 10,
    backgroundColor: '#fff0bc',
    borderWidth: 2,
    borderColor: '#ffc60b'

  },
  TextMode: {
    color: 'blue',
  },
  Text: {
    marginTop: 20,
    alignSelf: 'center',
  },
  Button: {
    marginTop: 10,
    width: 130,
    height: 40,
    backgroundColor: '#711f07'
  },
  ButtonCancel: {
    marginTop: 10,
    width: 130,
    height: 40,
    backgroundColor: '#ffff'
  },
})



const mapStateToProps = state => {
  return {
    Rooms: state.rooms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleUpdateRooms: (param) => dispatch(actionRooms.handleUpdateRooms(param)),
    handleDeleteRooms: (param) => dispatch(actionRooms.handleDeleteRooms(param))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRoom);
