import React from 'react';
import {
  FlatList,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import {InteractionManager} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {SocialBar} from '../socialBar';
import Icon from "react-native-vector-icons/FontAwesome";
import {Avatar} from '../avatar';
// import {data} from '../../data';
// let moment = require('moment');
import firebase from '../../utils/firebase';

export default class Feeds extends React.Component {
  static navigationOptions = {
    title: 'Comments'.toUpperCase()
  };

  constructor(props) {
    super(props);

    let comments = this.props.navigation.state.params.comments;
    this.data = []
    for(var key in comments){
      firebase.database().ref('Users').child(comments[key].username).on('value', (d) => {
        let a = {
          ava: d.val().profilepic,
          cmt: comments[key]
        }
        this.data.push(a)
      })
     
    }
    this.state = {
      data: this.data
    }
    this.renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(post, index) {
    return Math.random()
  }

  _renderItem(info) {
   console.log(info.item.ava)
    return (
        <View style={styles.container1}>
         <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV1', {id: info.item.user.id})}>
          <Avatar rkType='circle'  img={info.item.ava}/>
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <RkText rkType='header5'>{info.item.cmt.username}</RkText>
            <RkText rkType='secondary4 hintColor'>
              5 minutes
            </RkText>
          </View>
          <RkText rkType='primary3 mediumLine'>{info.item.cmt.comment}</RkText>
        </View>
      </View> 
    )
  }

  render() {
    let info = {};
    //console.log(this.state)
    info.item = this.state.data[0];
    return (
        <RkAvoidKeyboard style={styles.container} onResponderRelease={(event) => {
        Keyboard.dismiss();
      }}>
        <FlatList
            style={styles.root}
            data={this.state.data}
            extraData={this.state}
            ItemSeparatorComponent={this._renderSeparator}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}/>
        <View style={styles.footer}>
          <RkButton style={styles.plus} rkType='clear'>
            <RkText rkType='awesome secondaryColor'> <Icon name="plus" size={30} /></RkText>
          </RkButton>

          <RkTextInput
           // onFocus={() => this._scroll(true)}
            //onBlur={() => this._scroll(true)}
            //onChangeText={(message) => this.setState({message})}
           // value={this.state.message}
            rkType='row sticker'
            placeholder="Add a comment..."/>

          <RkButton onPress={() => this._pushMessage()} style={styles.send} rkType='circle highlight'>
            <Image source={require('../../assets/icons/sendIcon.png')}/>
          </RkButton>
        </View>
      </RkAvoidKeyboard>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
    header: {
      alignItems: 'center'
    },
    avatar: {
      marginRight: 16,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.screen.base
    },
    list: {
      paddingHorizontal: 17
    },
    footer: {
      flexDirection: 'row',
      minHeight: 60,
      padding: 10,
      backgroundColor: theme.colors.screen.alter
    },
    item: {
      marginVertical: 14,
      flex: 1,
      flexDirection: 'row'
    },
    itemIn: {},
    itemOut: {
      alignSelf: 'flex-end'
    },
    time: {
      alignSelf: 'flex-end',
      margin: 15
    },
    plus: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginRight: 7
    },
    send: {
      width: 40,
      height: 40,
      marginLeft: 10,
    },
    container1: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
      },
      content: {
        marginLeft: 16,
        flex: 1,
      },
      contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
      },
  }));