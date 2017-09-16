/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Keyboard } from "react-native";

import { connect } from "react-redux";
import firebase from "../../utils/firebase";
// import Modal from 'react-native-modalbox';

import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard
} from "react-native-ui-kitten";

import { GradientButton } from "../gradientButton/";
import { scale, scaleModerate, scaleVertical } from "../../utils/utils";
import Icon from "react-native-vector-icons/FontAwesome";

class Signup extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      Email: "",
      Password: ""
    };
  }

  changeName(text) {
    this.setState({
      Name: text
    });
  }

  changeEmail(text) {
    this.setState({
      Email: text
    });
  }

  changePassword(text) {
    this.setState({
      Password: text
    });
  }

  signUp() {
    // Keyboard.dismiss();
    // firebase.auth()
    //   .createUserWithEmailAndPassword(this.state.Email, this.state.Password)
    //   .then(() => {
    //     this.refs.modal.open()
    //   })
    //   .catch(function(error) {
    //   console.log(error.code + error.message);
    // })
  }

  render() {
    let renderIcon = () => {
      return (
        <Image
          style={styles.image}
          source={require("../../assets/icons/LogoApp.png")}
          style={{ width: 100, height: 100 }}
        />
      );
    };
    return (
      <View style={{ flex: 1 }}>
        <RkAvoidKeyboard
          style={styles.screen}
          onStartShouldSetResponder={e => true}
          onResponderRelease={e => Keyboard.dismiss()}
        >
          <View style={{ alignItems: "center" }}>
            {renderIcon()}
            <RkText rkType="h1">Registration</RkText>
          </View>
          <View style={styles.content}>
            <View>
              <RkTextInput
                rkType="rounded"
                placeholder="Name"
                onChangeText={this.changeName.bind(this)}
              />
              <RkTextInput
                rkType="rounded"
                placeholder="Email"
                onChangeText={this.changeEmail.bind(this)}
              />
              <RkTextInput
                rkType="rounded"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={this.changePassword.bind(this)}
              />
              <RkTextInput
                rkType="rounded"
                placeholder="Confirm Password"
                secureTextEntry={true}
              />
              <GradientButton
                style={styles.save}
                rkType="large"
                text="SIGN UP"
                onPress={() => this.signUp()}
              />
            </View>
            <View style={styles.footer}>
              <View style={styles.textRow}>
                <RkText rkType="primary3">Already have an account?</RkText>
                <RkButton
                  rkType="clear"
                  onPress={() => this.props.navigation.goBack()}
                >
                  <RkText rkType="header6"> Sign in now </RkText>
                </RkButton>
              </View>
            </View>
          </View>
        </RkAvoidKeyboard>
        {/* <Modal style={{height: 300, width: 300, borderRadius: 10}} position={"center"} isDisabled={false} ref={"modal"}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <RkText rkType='light h1'>Success Register</RkText>
          <RkText rkType='logo h0'>Ready to login now</RkText>
        </View>
          <Button
            raised
            buttonStyle={{marginBottom: 15,borderRadius: 30}}
            backgroundColor={"#FF5721"}
            title="OK"
            onPress = {() => this.props.navigation.goBack()}
          />
      </Modal> */}
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: theme.colors.screen.base
  },
  image: {
    marginBottom: 10,
    height: scaleVertical(77),
    resizeMode: "contain"
  },
  content: {
    justifyContent: "space-between"
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: "row",
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: "space-around"
  },
  footer: {
    justifyContent: "flex-end"
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center"
  }
}));

const mapStatetoProps = state => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    signup: info => dispatch(signup(info))
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(Signup);
