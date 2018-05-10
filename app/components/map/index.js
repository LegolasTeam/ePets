import React, { Component } from "react";

import { View, StyleSheet, Text, Image, Keyboard } from "react-native";

import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from "react-native-ui-kitten";
import { SocialBar } from "../socialBar";

import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";

class Map extends Component {
  state = {
    mapRegion: null,
    lastLat: null,
    lastLong: null,
    message: "",
    title: "",
    description: "",
    marker: [
      {
        latitude: 10.7783039,
        longtitude: 106.6899015,
        title: "Billy",
        description: "Chating with beautiful parrot"
      },
      {
        latitude: 10.77862,
        longtitude: 106.692616,
        title: "Nayna",
        description: "Chilling with cat"
      },
      {
        latitude: 10.779495,
        longtitude: 106.688818,
        title: "Nomu",
        description: "Coffee with cat"
      },
      {
        latitude: 10.77998,
        longtitude: 106.689301,
        title: "Rocky",
        description: "Playing disc catching"
      },
      {
        latitude: 10.78057,
        longtitude: 106.68988,
        title: "Tafi",
        description: "Monkey Show"
      },
      {
        latitude: 10.77246,
        longtitude: 106.687157,
        title: "John Snow",
        description: "Playing balls with Monkey. Come join me"
      },
      {
        latitude: 10.775928,
        longtitude: 106.681621,
        title: "Alexandra",
        description: "Spending afternoon with my lovely puppy"
      },
      {
        latitude: 10.779479,
        longtitude: 106.682093,
        title: "Elizabeth",
        description: "What a lovely day to be outside with my parrot"
      },
      {
        latitude: 10.784812,
        longtitude: 106.688273,
        title: "Ronin",
        description: "Join me cat lovers"
      },
      {
        latitude: 10.78692,
        longtitude: 106.693552,
        title: "Dog Racing Championship",
        description: "Bring your dog to compete for a $1000"
      }
    ]
  };

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      };
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set use the the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapPress(e) {
    // console.log(e.nativeEvent.coordinate.longitude);
    let region = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5
    };
    this.onRegionChange(region, region.latitude, region.longitude);
  }

  pushPosition() {
    Keyboard.dismiss();

    this.setState({
      title: "Billy",
      description: this.state.message,
      message: ""
    });
  }

  renderMarker() {
    return this.state.marker.map(
      ({ latitude, longtitude, title, description }) => {
        return (
          <MapView.Marker
            key={latitude}
            title={title}
            description={description}
            coordinate={{
              latitude: latitude + 0.0005 || -36.82339,
              longitude: longtitude + 0.0005 || -73.03569
            }}
          >
            <Icon name="map-marker-alt" size={35} color="#900" />
          </MapView.Marker>
        );
      }
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          onLongPress={this.onMapPress.bind(this) //onPress={this.onMapPress.bind(this)}
          }
        >
          <MapView.Marker
            title={this.state.title}
            description={this.state.description}
            coordinate={{
              latitude: this.state.lastLat + 0.0005 || -36.82339,
              longitude: this.state.lastLong + 0.0005 || -73.03569
            }}
          >
            <Icon name="map-marker" size={35} color="#900" />
          </MapView.Marker>
          {this.renderMarker()}
        </MapView>
        <View style={styles1.footer}>
          <RkTextInput
            onChangeText={message =>
              this.setState({
                message
              })}
            value={this.state.message}
            rkType="row sticker"
            placeholder="Add a description..."
          />

          <RkButton
            onPress={() => this.pushPosition()}
            style={styles1.send}
            rkType="circle highlight"
          >
            <Image source={require("../../assets/icons/sendIcon.png")} />
          </RkButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

let styles1 = RkStyleSheet.create(theme => ({
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
    position: "absolute",
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

export default Map;
