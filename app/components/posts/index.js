//import liraries
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator
} from "react-native";
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import firebase from "../../utils/firebase";

const storage = firebase.storage();

const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class Demo extends Component {
  static navigationOptions = {
    title: "Post".toUpperCase()
  };
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  _pickImage() {
    this.setState({ uploadURL: "" });

    ImagePicker.launchImageLibrary({}, response => {
      this.setState({ uploadURL: response.uri });
    });
  }

  _pushMessage() {
    firebase
      .database()
      .ref("Users")
      .child("rocky_dog")
      .child("posts")
      .push({
        caption: this.state.message,
        date: Date.now() / 1000,
        like: 0,
        url: "https://www.eandl.co.uk/2015/images/pet-banner-dog.jpg"
      });
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        {(() => {
          switch (this.state.uploadURL) {
            case null:
              return null;
            case "":
              return <ActivityIndicator />;
            default:
              return (
                <View>
                  {/* <Text>{this.state.uploadURL}</Text> */}
                  <View style={styles.footer}>
                    <RkButton
                      style={styles.plus}
                      rkType="clear"
                      onPress={() => this._pickImage()}
                    >
                      <RkText rkType="awesome secondaryColor">
                        {" "}
                        <Icon name="plus" size={30} />
                      </RkText>
                    </RkButton>

                    <RkTextInput
                      onChangeText={message =>
                        this.setState(
                          //onBlur={() => this._scroll(true)} // onFocus={() => this._scroll(true)}
                          { message }
                        )}
                      value={
                        this.state.message //  ref = 'txtInput'
                      }
                      rkType="row sticker"
                      placeholder="Add a caption..."
                    />

                    <RkButton
                      onPress={() => this._pushMessage()}
                      style={styles.send}
                      rkType="circle highlight"
                    >
                      <Image
                        source={require("../../assets/icons/sendIcon.png")}
                      />
                    </RkButton>
                  </View>
                </View>
              );
          }
        })()}
        <Image source={{ uri: this.state.uploadURL }} style={styles.image} />
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  image: {
    width: "100%",
    height: "100%"
  },
  header: {
    alignItems: "center"
  },
  avatar: {
    marginRight: 16
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  list: {
    paddingHorizontal: 17
  },
  footer: {
    flexDirection: "row",
    minHeight: 60,
    padding: 10,
    backgroundColor: theme.colors.screen.alter,
    bottom: 0
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: "row"
  },
  itemIn: {},
  itemOut: {
    alignSelf: "flex-end"
  },
  time: {
    alignSelf: "flex-end",
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
    marginLeft: 10
  },
  container1: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  content: {
    marginLeft: 16,
    flex: 1
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  }
}));
//make this component available to the app
export default Demo;
