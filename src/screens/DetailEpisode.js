import { StyleSheet, Dimensions, Share, Image, FlatList, SafeAreaView } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';

import { connect } from 'react-redux'
//import * as actionTodos from './../redux/actions/actionTodos'
import * as actionImages from './../redux/actions/actionImages'

class DetailEpisode extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cover: {
        ep: this.props.navigation.state.params.episode.title,
        image: 'https://webtoons-static.pstatic.net/image/pc/home/og_id.jpg?dt=2019090201'
      },
      data: [],
    }
  }

  componentDidMount() {
    const webtoonId= this.props.navigation.state.params.webtoon
    const episode= this.props.navigation.state.params.episode.id
    this.props.handleGetImages(webtoonId,episode)

    if (this.props.imagesLocal.images.isSuccess) {
      this.setState({ data: this.props.imagesLocal.images.data })
    }
  }

  onClick() {
    Share.share({
      message: 'BAM: we\'re helping your business with awesome React Native apps',
      url: 'http://bam.tech',
      title: 'Wow, did you see that?'
    }, {
      // Android only:
      dialogTitle: 'Share BAM goodness',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }
  handleDetail() {
    this.props.navigation.navigate('Detail')
  }
  render() {
    return (
      <Container style={styles.Container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back'
                onPress={() => this.handleDetail()} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>{this.state.cover.ep}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='share-alt'
                onPress={() => this.onClick()} />
            </Button>
          </Right>
        </Header>
        <Content style={styles.container}>
          <SafeAreaView style={styles.form}>
            <FlatList
              data={this.props.imagesLocal.images.data}
              renderItem={({ item }) =>

                <Image
                  style={styles.imageForm}
                  source={{ uri: item.image }} />
              }
              keyExtractor={item => item.page}
            />
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    padding: 4
  },
  imageForm: {
    height: Dimensions.get('window').height
  },
  form: {
    padding: 5
  },
  title: {
    fontSize: 20,
    width: 200
  }
})


const mapStateToProps = state => {
  return {
    imagesLocal: state.images
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetImages: (webtoonId,episode) => dispatch(actionImages.handleGetImages(webtoonId,episode))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailEpisode);
