import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground, Platform } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right, Thumbnail, Card, CardItem, Body } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux'
import * as actionCustomers from '../redux/actions/actionCustomers'


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

class EditCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      identityNumber: '',
      phoneNumber: '',
      customerId: '',
      data: [],
      photoCustomer: '',
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
    const param = {
      token: await AsyncStorage.getItem('token'),
      customer: this.state.customerId,
      data: await creatFormData(this.state.filePath)
    }
    await this.props.handleAddPhotoCustomers(param)
    await this.setState({ photoCustomer: this.props.customers.imageUrl })
    console.log(this.state.photoCustomer);

  }

  async handleUpdateCustomer() {
    await this.UploadPhotoCustomers()
    const param = {
      token: await AsyncStorage.getItem('token'),
      customer: this.state.customerId,
      data: {
        name: this.state.name,
        identity_number: this.state.identityNumber,
        phone_number: this.state.phoneNumber,
        image: this.state.photoCustomer
      }
    }
    await this.props.handleUpdateCustomers(param)
    this.props.navigation.navigate('Customer')

    await this.setState({ photoCustomer: '' })
  }

  async handleDeleteCustomer() {
    const param = {
      token: await AsyncStorage.getItem('token'),
      customer: this.state.customerId,
    }
    console.log(param);
    await this.props.handleDeleteCustomers(param)
    this.props.navigation.navigate('Customer')
  }



  UNSAFE_componentWillMount() {
    this.setState({ name: this.props.navigation.state.params.customer.name })
    this.setState({ identityNumber: this.props.navigation.state.params.customer.identity_number })
    this.setState({ phoneNumber: this.props.navigation.state.params.customer.phone_number })
    this.setState({
      filePath: {
        uri: this.props.navigation.state.params.customer.image
      }
    })
    this.setState({ customerId: this.props.navigation.state.params.customer.id })
  }

  UNSAFE_componentWillReceiveProps(nexProps) {
    if (nexProps.navigation.state.params.customer !== this.props.navigation.state.params.customer) {
      this.setState({ name: this.props.navigation.state.params.customer.name })
      this.setState({ identityNumber: this.props.navigation.state.params.customer.identity_number })
      this.setState({ phoneNumber: this.props.navigation.state.params.customer.phone_number })
      this.setState({
        filePath: {
          uri: this.props.navigation.state.params.customer.image
        }
      })
      this.setState({ customerId: this.props.navigation.state.params.customer.id })
    }
  }


  render() {


    return (
      <Container style={styles.container}
        style={styles.container}>
        <Card style={styles.innerContainer}>
          <LinearGradient style={styles.innerContainer}
            colors={['#f1c550', '#fff9e0', '#f1c550']}>
            <View >
              <View style={[styles.marginTitle]}>
                <Text style={styles.title}>Edit Customer</Text>
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
                  <Input style={{ fontFamily: 'BodoniFLF-Roman' }}
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
                <CardItem style={{ backgroundColor: 'transparent' }}>
                  <Button transparent block style={{ width: 100, height: 100 }}
                    onPress={this.chooseFile.bind(this)}>
                    <Image style={{ width: 100, height: 100 }}
                      source={{ uri: this.state.filePath.uri }} />
                  </Button>
                </CardItem>
              </View>
              <CardItem style={{ backgroundColor: 'transparent' }}>
                <Item style={{borderColor: 'transparent' }}>
                  <Button block style={styles.ButtonCancel}
                    onPress={() => this.props.navigation.navigate('Customer')}>
                    <Text style={{ color: 'black' }}>Cancel</Text></Button>
                  <Button block
                    style={styles.Button}
                    onPress={() => this.handleAddCustomer()}>
                    <Text style={{ color: '#ffffff' }}>Add</Text></Button>
                </Item>
              </CardItem>
              <Body>
                <Button block
                  style={styles.Button}
                  onPress={() => this.handleDeleteCustomer()}>
                  <Text style={{ color: '#ffffff' }}>Delete</Text></Button>
              </Body>
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
    height: 550,
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
    handleUpdateCustomers: (param) => dispatch(actionCustomers.handleUpdateCustomers(param)),
    handleDeleteCustomers: (param) => dispatch(actionCustomers.handleDeleteCustomers(param)),
    handleAddPhotoCustomers: (param) => dispatch(actionCustomers.handleAddPhotoCustomers(param)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCustomer);
