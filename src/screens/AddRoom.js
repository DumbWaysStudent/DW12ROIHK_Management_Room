import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right, Card, CardItem } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

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
    this.props.handleAddRooms(param)
    this.props.navigation.navigate('Room')
  }


  // componentDidMount() {
  //   this.passLogin()
  // }



  render() {
    return (
      <Container style={styles.container}>
        <Card style={styles.innerContainer}>
          <LinearGradient style={styles.innerContainer}
            colors={['#f1c550', '#fff9e0', '#f1c550']}>
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
              <CardItem style={{backgroundColor: 'transparent'}}>
                <Item>
                  <Button block style={styles.ButtonCancel}
                    onPress={() => this.props.navigation.navigate('Room')}>
                    <Text style={{ color: 'black' }}>Cancel</Text></Button>
                  <Button block style={styles.Button}
                    onPress={() => this.handleAddRoom()}>
                    <Text style={{ color: '#ffffff' }}>Add</Text></Button>
                </Item>
              </CardItem>
            </View>
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
    height: 250,
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
    marginTop: 20,
    width: 130,
    height: 40,
    backgroundColor: '#711f07'
  },
  ButtonCancel: {
    marginTop: 20,
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
    handleAddRooms: (param) => dispatch(actionRooms.handleAddRooms(param)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRoom);
