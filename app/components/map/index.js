import React, { Component } from "react";

import { View, StyleSheet, Text, Image, Keyboard, Button } from "react-native";

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

import {
  locationMarker,
  shopMarker,
  vetMarker,
  eventMarker
} from "./location-dump-data";

class Map extends Component {
  state = {
    mapRegion: null,
    lastLat: null,
    lastLong: null,
    message: "",
    title: "",
    description: "",
    locationMarker,
    shopMarker,
    vetMarker,
    eventMarker
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

  renderLocationMarker() {
    return this.state.locationMarker.map(
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
            <Icon name="map-marker" size={24} color="#900" />
          </MapView.Marker>
        );
      }
    );
  }

  renderShopMarker() {
    return this.state.shopMarker.map(
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
            <Icon name="shopping-bag" size={24} color="#5495ff" />
          </MapView.Marker>
        );
      }
    );
  }

  renderVetMarker() {
    return this.state.vetMarker.map(
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
            <Icon name="plus" size={24} color="red" />
          </MapView.Marker>
        );
      }
    );
  }

  renderEventMarker() {
    return this.state.eventMarker.map(
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
            <Icon name="music" size={24} color="purple" />
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
          onLongPress={
            this.onMapPress.bind(this) //onPress={this.onMapPress.bind(this)}
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
            <Icon name="map-marker" size={24} color="green" />
          </MapView.Marker>
          {this.renderLocationMarker()}
          {this.renderShopMarker()}
          {this.renderVetMarker()}
          {this.renderEventMarker()}
        </MapView>
        <View style={{ position: "absolute", bottom: 70, right: 10 }}>
          <RkButton rkType="circle" style={styles1.info}>
            <Icon name="gear" size={18} color="white" />
          </RkButton>
        </View>
        <View style={styles1.footer}>
          <RkTextInput
            onChangeText={message =>
              this.setState({
                message
              })
            }
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
  info: {
    width: 40,
    height: 40
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
