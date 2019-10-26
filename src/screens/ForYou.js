import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  Container, Content, Body, Item, Button, Input, Icon, List,
  Card, CardItem, Thumbnail, ListItem, Left, Header, Spinner
} from 'native-base'
import Slideshow from 'react-native-image-slider-show';

import { connect } from 'react-redux'
import * as actionWebtoons from './../redux/actions/actionWebtoons'


class ForYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      slidePos: 1,
      slideInterval: null,
      data: [{
        title: 'Webtoon 1',
        genre: 'Barton waited twenty always repair in within we do.',
        image: 'https://via.placeholder.com/1080',
        favorite_count: 42,
        isFavorite: 1,
        create_by: 1
      },
      {
        title: 'Webtoon 2',
        genre: 'Barton waited twenty always repair in within we do.',
        image: 'https://via.placeholder.com/1020',
        favorite_count: 44,
        isFavorite: 0,
        create_by: 2
      }],
      favorite: [],
      imageBanners: []
    };
  }


  componentWillMount() {
    this.setState({
      slideInterval: setInterval(() => {
        this.setState({
          slidePos: this.state.slidePos === this.state.data.length ? 0 : this.state.slidePos + 1
        });
      }, 2000)
    });
    this.getData()
  }

  async getData() {
    await this.props.handleGetWebtoons()
    await this.setState({ data: this.props.webtoonsLocal.webtoons.data })

  }
  componentDidMount() {
    // let image = []
    // for(let i=0; i < 2; i++){
    //   image[i]= this.state.data[i].image
    // }
    // this.setState({imageBanners: image})

    let newData = this.state.data;
    //newData[idx].isFav = !newData[idx].isFav;
    // function update favorite list
    newData = this.state.data.filter((item) =>
      item.isFav == true
    );
    this.setState({ favorite: newData });
    this.props.navigation.setParams({ favorite: this.state.favorite })

  }


  componentWillUnmount() {
    clearInterval(this.state.slideInterval);
  }
  handleDetail(item) {
    this.props.navigation.navigate('Detail', { webtoon: item })
  }

  onHandleFavoriteBtn(idx) {
    let newData = this.state.data;
    newData[idx].isFav = !newData[idx].isFav;
    if (newData[idx].favBtnColor == '#ff9c9c') {
      newData[idx].favBtnColor = '#ff3333'
    } else if (newData[idx].favBtnColor == '#ff3333') {
      newData[idx].favBtnColor = '#ff9c9c'
    }
    // function update favorite list
    newData = this.state.data.filter((item) =>
      item.isFav == true
    );
    this.setState({ favorite: newData });
  }


  render() {
    if (this.props.webtoonsLocal.isLoading) {
      return (<Spinner />)
    }
    else if (this.props.webtoonsLocal.isSuccess) {
      // alert('here')
      if (this.props.webtoonsLocal.needRefresh) {
        this.getData()
      }

      return (
        <Container style={styles.container}>
          <Content>
            <Header searchBar style={styles.Header}>
            </Header>
            <List>
              <Card>
                <List style={styles.formAll}

                  dataArray={this.props.webtoonsLocal.webtoons.data} horizontal={false}
                  renderRow={(item) =>

                    <CardItem thumbnail>
                      <Left>
                        <Button transparent onPress={() => this.handleDetail(item)}>
                          <Thumbnail square source={{ uri: item.image }} />
                        </Button>
                        <Body>
                          <Text >{item.title}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                  }>
                </List>
              </Card>
              <Button block small
                onPress={() => alert('here')}>
                <Text style={{ color: '#ffffff' }}> + Favorite </Text>
              </Button>

            </List>

          </Content>
        </Container>
      );
    }
    else { return (<Spinner />) }
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
    width: 250,

  },
  title: {
    height: 22,
    fontSize: 20,
    color: 'white'
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
    webtoonsLocal: state.webtoons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetWebtoons: () => dispatch(actionWebtoons.handleGetWebtoons())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForYou);
