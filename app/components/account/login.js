/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  AsyncStorage
} from "react-native";

import firebase from "../../utils/firebase";

import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from "react-native-ui-kitten";

import { GradientButton } from "../gradientButton/index";
// import { Button } from "react-native-elements";
import { scale, scaleModerate, scaleVertical } from "../../utils/utils";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      Username: "",
      Password: ""
    };
  }

  changeUsername(text) {
    this.setState({
      Username: text
    });
  }

  changePassword(text) {
    this.setState({
      Password: text
    });
  }

  async login() {
    // try {
    //   await AsyncStorage.setItem("username", this.state.Username);
    // } catch (err) {
    //   console.log("====================================");
    //   console.log(err);
    //   console.log("====================================");
    // }

    this.props.navigation.navigate("Tabview");
  }

  componentWillMount() {
    // this.checkAccount();
  }

  async checkAccount() {
    try {
      var username = await AsyncStorage.getItem("username");
      if (username) {
        this.props.navigation.navigate("Tabview");
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }

  render() {
    let renderIcon = () => {
      return (
        <Image
          style={styles.image}
          source={require("../../assets/icons/LogoApp.png")}
          style={{ width: 120, height: 120 }}
        />
      );
    };

    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={e => true}
        onResponderRelease={e => Keyboard.dismiss()}
      >
        <View style={styles.header}>
          {renderIcon()}
          {/*<RkText rkType='light h1'>React Native</RkText>*/}
          <RkText rkType="logo h0">ePets</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput
              rkType="rounded"
              placeholder="Username"
              onChangeText={this.changeUsername.bind(this)}
            />
            <RkTextInput
              rkType="rounded"
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={this.changePassword.bind(this)}
            />
            <GradientButton
              style={styles.save}
              rkType="large"
              text="LOGIN"
              onPress={() => this.login()}
            />
          </View>

          <View style={styles.buttons}>
            <RkButton style={styles.button} rkType="social">
              <RkText rkType="awesome hero">
                <Icon name="twitter" size={30} />
              </RkText>
            </RkButton>
            <RkButton style={styles.button} rkType="social">
              <RkText rkType="awesome hero">
                <Icon name="google" size={30} />
              </RkText>
            </RkButton>
            <RkButton style={styles.button} rkType="social">
              <RkText rkType="awesome hero">
                <Icon name="facebook" size={30} />
              </RkText>
            </RkButton>
          </View>

          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType="primary3">Don’t have an account?</RkText>
              <RkButton
                rkType="clear"
                onPress={() => this.props.navigation.navigate("Signup")}
              >
                <RkText rkType="header6"> Sign up now </RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: scaleVertical(16),
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: theme.colors.screen.base
  },
  image: {
    height: scaleVertical(77),
    resizeMode: "contain"
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  content: {
    justifyContent: "space-between"
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: "row",
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: "space-around"
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    borderColor: theme.colors.border.solid
  },
  footer: {}
}));
