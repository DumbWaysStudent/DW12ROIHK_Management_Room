import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground} from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right, Card, CardItem } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux'
import * as actionCustomers from './../redux/actions/actionCustomers'
import { TouchableHighlight } from 'react-native-gesture-handler';

const creatFormData = (photo) => {
  const data = new FormData();
  data.append("profileImage", {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS == "android" ? photo.uri : photo.uri.replace("file://", "")
  })
  return data
}

class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevScreen: this.props.navigation.state.params.prevScreen,
      name: '',
      identityNumber: '',
      phoneNumber: '',
      data: [],
      photoCustomer: '',
      token: '',
      filePath: {
        uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
      },
    };
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,

        });
      }
    });
  };

  async UploadPhotoCustomers() {
    console.log("Upload Photo");
    this.setState({ token: await AsyncStorage.getItem('token') })
    const param = {
      token: this.state.token,
      customer: this.state.customerId,
      data: await creatFormData(this.state.filePath)
    }
    console.log('here');

    console.log(param);

    await this.props.handleAddPhotoCustomers(param)
    await this.setState({ photoCustomer: this.props.customers.imageUrl })
    console.log(this.state.photoCustomer);

  }

  async handleAddCustomer() {
    console.log('here')

    await this.UploadPhotoCustomers()
    const param = {
      token: this.state.token,
      data: {
        name: this.state.name,
        identity_number: this.state.identityNumber,
        phone_number: this.state.phoneNumber,
        image: this.state.photoCustomer
      }


    }
    console.log('token');
    await this.props.handleAddCustomers(param)
    this.props.navigation.navigate('Customer')
  }


  render() {
    return (
        <Container onPress={()=> alert('oke')}
        style={styles.container}>
          <Card style={styles.innerContainer}>
            <LinearGradient style={styles.innerContainer}
              colors={['#f1c550', '#fff9e0', '#f1c550']}>
              <View >
                <View style={[styles.marginTitle]}>
                  <Text style={styles.title}>Add Customer</Text>
                </View>
                <View>
                  <Text style={styles.text}>Customer Name</Text>
                  <Item regular
                    style={styles.formItem}>
                    <Input style={{ fontFamily: 'BodoniFLF-Roman' }}
                      value={this.state.name}
                      onChangeText={(text) => this.setState({ name: text })}
                    />
                  </Item >
                  <Text style={styles.text}>Identity Number</Text>
                  <Item regular
                    style={styles.formItem}>
                    <Input
                      style={{ fontFamily: 'BodoniFLF-Roman' }}
                      value={this.state.identityNumber}
                      onChangeText={(text) => this.setState({ identityNumber: text })}
                      keyboardType={"number-pad"}
                    />
                  </Item >
                  <Text style={styles.text}>Phone Number</Text>
                  <Item regular
                    style={styles.formItem}>
                    <Input style={{ fontFamily: 'BodoniFLF-Roman' }}
                      value={this.state.phoneNumber}
                      onChangeText={(text) => this.setState({ phoneNumber: text })}
                      keyboardType={"number-pad"}
                    />
                  </Item >
                </View>
                <CardItem style={{ backgroundColor: 'transparent' }}>
                  <Button transparent block style={{ width: 100, height: 100 }}
                    onPress={this.chooseFile.bind(this)}>
                    <Image style={{ width: 100, height: 100 }}
                      source={{ uri: this.state.filePath.uri }} />
                  </Button>
                </CardItem>
                <CardItem style={{ backgroundColor: 'transparent' }}>
                  <Item>
                    <Button block style={styles.ButtonCancel}
                      onPress={() => this.props.navigation.navigate(this.state.prevScreen)}>
                      <Text style={{ color: 'black' }}>Cancel</Text></Button>
                    <Button block
                      style={styles.Button}
                      onPress={() => this.handleAddCustomer()}>
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
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  innerContainer: {
    alignSelf: 'center',
    width: 320,
    height: 500,
    paddingHorizontal: 10,
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
    fontSize: 32,
    fontFamily: 'Italianno-Regular-OTF',
  },
  text: {
    //color: 'white',
    fontFamily: 'Italianno-Regular-OTF',
    fontSize: 18,
  },
  box: {
    //borderColor: 'white',

  },
  formItem: {
    marginBottom: 10,
    //borderColor: 'white'
  },
  Button: {
    width: 130,
    height: 40,
    backgroundColor: '#711f07'
  },
  ButtonCancel: {
    width: 130,
    height: 40,
    backgroundColor: '#ffff'
  },
  Text: {
    marginTop: 20,
    alignSelf: 'center',
  }
})



const mapStateToProps = state => {
  return {
    customers: state.customers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddCustomers: (param) => dispatch(actionCustomers.handleAddCustomers(param)),
    handleAddPhotoCustomers: (param) => dispatch(actionCustomers.handleAddPhotoCustomers(param)),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomer);
