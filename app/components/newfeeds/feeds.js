import React from "react";
import { FlatList, Image, View, TouchableOpacity } from "react-native";
import { RkText, RkCard, RkStyleSheet } from "react-native-ui-kitten";
import { SocialBar } from "../socialBar";
import firebase from "../../utils/firebase";
// import {data} from '../../data';
// let moment = require('moment');

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
        <RkCard rkType="backImg">
          <Image
            rkCardImg
            source={{ uri: info.item.post.url }}
            style={{ resizeMode: "cover" }}
          />
          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType="header2 inverseColor">
              {info.item.user.displayName}
            </RkText>
            <RkText rkType="secondary2 inverseColor">5 minutes</RkText>
            <View rkCardFooter style={styles.footer}>
              <SocialBar
                rkType="leftAligned"
                navigation={this.props.navigation}
                id={{ root: info.item.root, id: info.item.id }}
                color="white"
              />
            </View>
          </View>
        </RkCard>
      </TouchableOpacity>
    );
  }

  render() {
    let info = {};
    info.item = this.state.data[0];
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.root}
      />
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  overlay: {
    justifyContent: "flex-end"
  },
  footer: {
    width: 240
  }
}));
