import React, { Component } from "react";

import { View } from "react-native";

import MapView from "react-native-maps";

class Map extends Component {
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ top: 0, bottom: 0, left: 0, right: 0, position: "absolute" }}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        />
      </View>
    );
  }
}

export default Map;
