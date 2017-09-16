import React from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';
//import {data} from '../../data';
import {Avatar} from '../avatar';
import {SocialBar} from '../socialBar';
//let moment = require('moment');


export default class Feed extends React.Component {
  static navigationOptions = {
    title: 'ePets'.toUpperCase()
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    let id = params ? params.id : 1;
    this.data = params.info
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <RkCard rkType='article'>
          <Image rkCardImg source={{uri:this.data.item.post.url}}/>
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='header4'>{this.data.item.user.name}</RkText>
              <RkText rkType='secondary2 hintColor'>5 minutes</RkText>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <Avatar rkType='circle' img={this.data.item.user.ava}/>
            </TouchableOpacity>
          </View>
          <View rkCardContent>
            <View>
              <RkText rkType='primary3 bigLine'>{this.data.item.post.caption}</RkText>
            </View>
          </View>
          <View rkCardFooter>
            <SocialBar navigation={this.props.navigation} cmts={this.data.item.post.comments}/>
          </View>
        </RkCard>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
}));