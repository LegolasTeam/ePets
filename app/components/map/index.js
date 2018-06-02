import React, { Component } from "react";

import { findNodeHandle, NativeModules, View, StyleSheet, Text, Image, Keyboard, Button }
from "react-native";
import {Popover, PopoverController} from 'react-native-modal-popover';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from "react-native-ui-kitten";
import MapViewDirections from 'react-native-maps-directions';

import { SocialBar } from "../socialBar";
import { Select } from './Select';

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
    eventMarker,
    showPopover: false,
    popoverAnchor: { x: 0, y: 0, width: 0, height: 0 },
    initLat: 10.7719343,
    initLong: 106.6857283,
    finalLat: 10.7624218,
    finalLong: 106.6790126,
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

  setButton = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    this.setState({ popoverAnchor: { x, y, width, height } });
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
      ({ latitude, longitude, title, description }) => {
        return (
          <MapView.Marker
            key={latitude}
            title={title}
            description={description}
            coordinate={{
              latitude: latitude + 0.0005 || -36.82339,
              longitude: longitude + 0.0005 || -73.03569
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
      ({ latitude, longitude, title, description }) => {
        return (
          <MapView.Marker
            key={latitude}
            title={title}
            description={description}
            coordinate={{
              latitude: latitude + 0.0005 || -36.82339,
              longitude: longitude + 0.0005 || -73.03569
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
      ({ latitude, longitude, title, description }) => {
        return (
          <MapView.Marker
            key={latitude}
            title={title}
            description={description}
            coordinate={{
              latitude: latitude + 0.0005 || -36.82339,
              longitude: longitude + 0.0005 || -73.03569
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
      ({ latitude, longitude, title, description }) => {
        return (
          <MapView.Marker
            key={latitude}
            title={title}
            description={description}
            coordinate={{
              latitude: latitude + 0.0005 || -36.82339,
              longitude: longitude + 0.0005 || -73.03569
            }}
          >
            <Icon name="music" size={24} color="purple" />
          </MapView.Marker>
        );
      }
    );
  }


  render() {
    const { showVet, showShop, showEvent,locationMarker,
      finalLong, finalLat, initLong, initLat} = this.state;
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
        ref={c => this.mapView = c}
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
            {showShop && this.renderShopMarker()}
            {showVet && this.renderVetMarker()}
            {showEvent && this.renderEventMarker()}
            <MapViewDirections
              origin={{latitude: initLat, longitude: initLong}}
              destination={{latitude: finalLat, longitude: finalLong}}
              apikey='AIzaSyCEyYJhtqSBAauv9Y6VukL7t3zodJ0D8sY'
              strokeWidth={4}
              strokeColor='#f64e59'
            />
        </MapView>
          <View style={{ position: "absolute", bottom: 70, right: 10}}
            onLayout={this.setButton}
            >
            <RkButton rkType="circle" style={styles1.info}
              ref={r => {this.button = r}}
              onPress={() => this.setState({showPopover: true})}
              >
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
          <Popover
            visible={this.state.showPopover}
            fromRect={this.state.popoverAnchor}
            onClose={() => this.setState({showPopover: false})}
            contentStyle={{borderRadius: 5, backgroundColor: 'white'}}
            // placement="auto"
            >
              <View style={styles.row}>
                <Select color='red' text='VET'
                  icon={<Icon name='plus' size={20}/> }
                  selected={showVet} onPress={() => {
                    this.setState({showVet: !showVet})
                  }}
                />
              </View>
              <View style={styles.row}>
                <Select color='purple' text='Event'
                  icon={<Icon name='music' size={20}/> }
                  selected={showEvent} onPress={() => {
                    this.setState({showEvent: !showEvent})
                  }}
                />
              </View>
              <View style={styles.row}>
                <Select color='#5495ff' text='Shop'
                  icon={<Icon name='shopping-bag' size={20}/> }
                  selected={showShop} onPress={() => {
                    this.setState({showShop: !showShop})
                  }}
                />
              </View>
            </Popover>
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
}));

export default Map;
