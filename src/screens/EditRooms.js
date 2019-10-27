import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right } from 'native-base';

import { connect } from 'react-redux'
import * as actionRooms from '../redux/actions/actionRooms'


class EditRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room_name: '',
      roomId:'',
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
    await this.props.handleUpdateRooms(param)
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
     this.setState({room_name: this.props.navigation.state.params.room.room_name})
     this.setState({roomId: this.props.navigation.state.params.room.id})
   }

   UNSAFE_componentWillReceiveProps(nexProps){
     if(nexProps.navigation.state.params.room !== this.props.navigation.state.params.room){
      this.setState({room_name: nexProps.navigation.state.params.room.room_name})
      this.setState({roomId: nexProps.navigation.state.params.room.id})
     }
   }


  render() {
    
    const { label, icon, onChange } = this.props;
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <View >
            <View style={[styles.marginTitle]}>
              <Text style={styles.subTitle}>Edit Room</Text>
            </View>
            <View>
              <Text style={styles.text}>Room Name</Text>
              <Item regular
                style={styles.formItem}>
                <Input
                  value={this.state.room_name}
                  onChangeText={(text) => this.setState({ room_name: text })}
                />
              </Item >
            </View>
            <Item>
              <Left>
                <Button block rounded light
                  onPress={() => this.props.navigation.navigate('Room')}>
                  <Text style={{ color: 'black' }}>Cancel</Text></Button>
              </Left>
              <Right>
                <Button block rounded light danger
                  onPress={() => this.handleUpdateRoom()}>
                  <Text style={{ color: '#ffffff' }}>Edit</Text></Button>
              </Right>
            </Item>
            <Button block rounded light danger
            style={styles.marginSubTitle}
                  onPress={() => this.handleDeleteRoom()}>
                  <Text style={{ color: '#ffffff' }}>Delete</Text></Button>
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
