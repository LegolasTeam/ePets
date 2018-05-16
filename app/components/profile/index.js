import React, { Component } from "react";

import {
  View,
  Text,
  Platform,
  Animated,
  ScrollView,
  Dimensions,
  StyleSheet
} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import SliderEntry from "./SliderEntry";
import { sliderWidth, itemWidth } from "./styles/SliderEntry.style";
import styles1, { colors } from "./styles/index.style";
import Header from "./Header";
import Timeline from "./Timeline";
import firebase from "../../utils/firebase";
import moment from "moment";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/FontAwesome";

const Screen = {
  height: Dimensions.get("window").height - 75
};

// const ENTRIES1 = [
//   {
//     title: "Beautiful and dramatic Antelope Canyon",
//     subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
//     illustration: "http://i.imgur.com/UYiroysl.jpg"
//   },
//   {
//     title: "Earlier this morning, NYC",
//     subtitle: "Lorem ipsum dolor sit amet",
//     illustration: "http://i.imgur.com/UPrs1EWl.jpg"
//   },
//   {
//     title: "White Pocket Sunset",
//     subtitle: "Lorem ipsum dolor sit amet et nuncat ",
//     illustration: "http://i.imgur.com/MABUbpDl.jpg"
//   },
//   {
//     title: "Acrocorinth, Greece",
//     subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
//     illustration: "http://i.imgur.com/KZsmUi2l.jpg"
//   },
//   {
//     title: "The lone tree, majestic landscape of New Zealand",
//     subtitle: "Lorem ipsum dolor sit amet",
//     illustration: "http://i.imgur.com/2nCt3Sbl.jpg"
//   },
//   {
//     title: "Middle Earth, Germany",
//     subtitle: "Lorem ipsum dolor sit amet",
//     illustration: "http://i.imgur.com/lceHsT6l.jpg"
//   }
// ];

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const SLIDER_1_FIRST_ITEM = 0;

class Profile extends Component {
  static navigationOptions = {
    title: "Profile"
  };
  constructor(props) {
    super(props);
    this.items = [
      {
        title: "",
        subtitle: "",
        illustration: "https://i.imgur.com/DOIMvNf.jpg"
      },
      {
        title: "",
        subtitle: "",
        illustration: "https://i.imgur.com/m0F8DzG.png"
      }
    ];
    firebase
      .database()
      .ref("Users")
      .child("rocky_dog")
      .child("posts")
      .on("child_added", data => {
        let temp = {
          title: data.val().caption,
          subtitle: moment.unix(data.val().date).fromNow(),
          illustration: data.val().url
        };
        this.items.push(temp);
        //console.log(items)
      });
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      slider1Ref: null,
      scrollY: new Animated.Value(0)
    };
    this._deltaY = new Animated.Value(0);
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }
  slideShow() {
    const { slider1ActiveSlide, slider1Ref } = this.state;

    return (
      <View style={[styles1.exampleContainer, { backgroundColor: "white" }]}>
        <Text style={[styles1.title, { fontSize: 30, color: "black" }]}>
          Rocky
        </Text>
        <Text style={[styles1.subtitle, { fontSize: 25, color: "black" }]}>
          I love my dog
        </Text>
        <Carousel
          ref={c => {
            if (!this.state.slider1Ref) {
              this.setState({ slider1Ref: c });
            }
          }}
          data={this.items}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.6}
          enableMomentum={false}
          containerCustomStyle={styles1.slider}
          contentContainerCustomStyle={styles1.sliderContentContainer}
          scrollEndDragDebounceValue={Platform.OS === "ios" ? 0 : 100}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
          autoplay={true}
          autoplayInterval={3000}
          autoplayDelay={2500}
        />
      </View>
    );
  }
  _renderScrollViewContent() {
    return (
      <ScrollView style={styles.scrollViewContent}>
        {this.slideShow()}
        <Timeline navigation={this.props.navigation} />
      </ScrollView>
    );
  }

  render() {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp"
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: "clamp"
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: "clamp"
    });

    return (
      <View style={styles.fill}>
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: this.state.scrollY }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/epets-80b54.appspot.com/o/ProfilePictures%2Fhusky_dog%2Fpics%2Frocky_dog.PNG?alt=media&token=4910e27c-944d-469a-ad9e-f03cebe6cb00"
            }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [{ scale: titleScale }, { translateY: titleTranslate }]
            }
          ]}
        >
          <Header />
        </Animated.View>
        <ActionButton
          buttonColor="rgba(0,0,0,0.5)"
          onPress={() => {
            this.props.navigation.navigate("Post");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    flex: 1
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: "absolute",
    top: 20,
    left: 70,
    right: 70,
    width: null,
    height: HEADER_MAX_HEIGHT - 70,
    resizeMode: "cover",
    borderRadius: 200
  },
  bar: {
    backgroundColor: "transparent",
    marginTop: Platform.OS === "ios" ? 28 : 38,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  title: {
    color: "white",
    fontSize: 18
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});

export default Profile;
