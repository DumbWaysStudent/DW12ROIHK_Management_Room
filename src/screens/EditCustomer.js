import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, AsyncStorage, Image, ImageBackground, Platform } from 'react-native';
import { Item, Input, Button, Icon, Container, Left, Right, Thumbnail } from 'native-base';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux'
import * as actionCustomers from '../redux/actions/actionCustomers'


const creatFormData = (photo) =>{
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

  async UploadPhotoCustomers(){
    console.log("Upload Photo");
    const param = {
      token: await AsyncStorage.getItem('token'),
      customer: this.state.customerId,
      data: await creatFormData(this.state.filePath) 
    }
    console.log('here');
    
    console.log(param);
    
    await this.props.handleAddPhotoCustomers(param)
    await this.setState({photoCustomer: this.props.customers.imageUrl})
    console.log(this.state.photoCustomer);
    
  }

  async handleUpdateCustomer() {
    console.log('start');
    
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
    
    await this.setState({photoCustomer: ''})
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
    this.setState({ customerId: this.props.navigation.state.params.customer.id })
  }

  UNSAFE_componentWillReceiveProps(nexProps) {
    if (nexProps.navigation.state.params.customer !== this.props.navigation.state.params.customer) {
      this.setState({ name: this.props.navigation.state.params.customer.name })
      this.setState({ identityNumber: this.props.navigation.state.params.customer.identity_number })
      this.setState({ phoneNumber: this.props.navigation.state.params.customer.phone_number })
      this.setState({ customerId: this.props.navigation.state.params.customer.id })
    }
  }


  render() {

    const { label, icon, onChange } = this.props;
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <View >
            <View style={[styles.marginTitle]}>
              <Text style={styles.subTitle}>Edit Customer</Text>
            </View>
            <View>
              <Text style={styles.text}>Customer Name</Text>
              <Item regular
                style={styles.formItem}>
                <Input
                  value={this.state.name}
                  onChangeText={(text) => this.setState({ name: text })}
                />
              </Item >
              <Text style={styles.text}>Identity Number</Text>
              <Item regular
                style={styles.formItem}>
                <Input
                  value={this.state.identityNumber}
                  onChangeText={(text) => this.setState({ identityNumber: text })}
                  keyboardType={"number-pad"}
                />
              </Item >
              <Text style={styles.text}>Phone Number</Text>
              <Item regular
                style={styles.formItem}>
                <Input
                  value={this.state.phoneNumber}
                  onChangeText={(text) => this.setState({ phoneNumber: text })}
                  keyboardType={"number-pad"}
                />
              </Item >
              <Item >
              <Button transparent block style={{width: 100, height: 100}}
              onPress={this.chooseFile.bind(this)}>
                <Image style={{width: 100, height: 100}}
                  source={{ uri: this.state.filePath.uri }}/>
              </Button>
              </Item>
            </View>
            <Item>
              <Left>
                <Button block rounded light
                  onPress={() => this.props.navigation.navigate('Customer')}>
                  <Text style={{ color: 'black' }}>Cancel</Text></Button>
              </Left>
              <Right>
                <Button block rounded light danger
                  onPress={() => this.handleUpdateCustomer()}>
                  <Text style={{ color: '#ffffff' }}>Edit</Text></Button>
              </Right>
            </Item>
            <Button block rounded light danger
              style={styles.marginSubTitle}
              onPress={() => this.handleDeleteCustomer()}>
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
