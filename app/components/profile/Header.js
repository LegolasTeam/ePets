import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { RkText, RkButton, RkStyleSheet } from "react-native-ui-kitten";

class Header extends Component {
  render() {
    return (
      <View style={[styles.userInfo, styles.bordered]}>
        <View style={styles.section}>
          <RkText rkType="header3" style={styles.space}>
            12
          </RkText>
          <RkText rkType="secondary1 hintColor">Posts</RkText>
        </View>
        <View style={styles.section}>
          <RkText rkType="header3" style={styles.space}>
            15
          </RkText>
          <RkText rkType="secondary1 hintColor">Followers</RkText>
        </View>
        <View style={styles.section}>
          <RkText rkType="header3" style={styles.space}>
            20
          </RkText>
          <RkText rkType="secondary1 hintColor">Following</RkText>
        </View>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 17
  },
  userInfo: {
    flexDirection: "row",
    paddingVertical: 24,
    height: 100
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  section: {
    flex: 1,
    alignItems: "center"
  },
  space: {
    marginBottom: 3
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: "center",
    flexDirection: "row",
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flexDirection: "row",
    paddingVertical: 8
  },
  button: {
    flex: 1,
    alignSelf: "center"
  }
}));

export default Header;
