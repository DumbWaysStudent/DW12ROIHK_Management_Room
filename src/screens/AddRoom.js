import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right } from 'native-base';

import { connect } from 'react-redux'
import * as actionRooms from './../redux/actions/actionRooms'


class AddRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room_name: '',
    };
  }


  async handleAddRoom() {
    console.log('here')

    const param = {
      token: await AsyncStorage.getItem('token'),
      data: {
        room_name: this.state.room_name,
      }
    }
    console.log('token');
    await this.props.handleAddRooms(param)
    this.props.navigation.navigate('Room')
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
              <Text style={styles.subTitle}>Add Room</Text>
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
                  onPress={() => this.handleAddRoom()}>
                  <Text style={{ color: '#ffffff' }}>Add</Text></Button>
              </Right>
            </Item>
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
    handleAddRooms: (param) => dispatch(actionRooms.handleAddRooms(param)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRoom);
