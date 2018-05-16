import React from "react";
import {
  FlatList,
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { RkText, RkCard, RkStyleSheet } from "react-native-ui-kitten";
import {GradientButton} from '../gradientButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { SocialBar } from "../socialBar";
import {Avatar} from '../avatar';
import firebase from "../../utils/firebase";
// import {data} from '../../data';
import moment from 'moment';

export default class Feeds extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Image
        source={require("../../assets/icons/appIcon.png")}
        style={{ width: 80, height: 30, marginLeft: 15 }}
      />
    )
  };

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
    this.renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref("Users")
      .on("value", data => {
        var d = [];
        if (data.val() != null) {
          var a = data.val();
          for (var key in a) {
            if (a[key].posts !== null) var b = a[key].posts;
            for (var k in b) {
              let post = {
                id: k,
                root: key,
                user: {
                  name: a[key].username,
                  ava: a[key].profilepic,
                  displayName: a[key].displayname
                },
                post: b[k]
              };
              d.push(post);
            }
          }
          this.setState({
            data: d
          });
        }
      });
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate("Feed", { info: info })}
      >
        <RkCard style={styles.card}>
          <Image rkCardImg source={{uri: info.item.post.url}}/>
          <View rkCardFooter>
              <View style={styles.userInfo}>
                <Avatar style={styles.avatar} rkType='circle small' img={info.item.user.ava}/>
                <RkText rkType='header6'>{info.item.user.displayName}</RkText>
              </View>
              <RkText rkType='secondary2 hintColor' style={styles.time}>{moment().add(2, 'seconds').fromNow()}</RkText>
          </View>
          <View rkCardContent>
            <View>
              <RkText rkType='primary3 mediumLine' numberOfLines={2}>{info.item.post.caption}</RkText>
            </View>
          </View>
          <View style={styles.footer} rkCardFooter>
            <SocialBar
              rkType="leftAligned"
              navigation={this.props.navigation}
              id={{ root: info.item.root, id: info.item.id }}
              color="black"
            />
          </View>
        </RkCard>
      </TouchableOpacity>
    );
  }

  render() {
    let info = {};
    info.item = this.state.data[0];
    return (
      <View style={{ flex: 1 }}>
        {this.state.data.length == 0 ? (
          <ActivityIndicator
            size={150}
            color={"#ef5350"}
            style={{ marginTop: 200 }}
          />
        ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
            style={styles.root}
          />
          <GradientButton
            rkType="small"
            onPress={() => this.props.navigation.navigate("Post")}
            style={styles.button}
          >
            <Icon name="md-create" style={styles.buttonIcon}></Icon>
          </GradientButton>
        </View>
        )}
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  card: {
    marginVertical: 8
  },
  root: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  overlay: {
    justifyContent: "flex-end"
  },
  footer: {
    width: 240
  },
  userInfo: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 17
  },
  time: {
    paddingTop: 5,
    marginRight: 10
  },
  button: {
    width: 45,
    height: 45,
    position: "absolute",
    borderRadius: 50,
    right: 10,
    bottom: 10
  },
  buttonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white'
    },
}));
