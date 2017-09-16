import React, { Component } from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
// Screens
import Login from "./components/account/login";
import Signup from "./components/account/signup";

import Feed from "./components/newfeeds/feed";
import Feeds from "./components/newfeeds/feeds";
import Comments from "./components/comments";
import Profile from "./components/profile";
import Map from "./components/map";
import Post from "./components/posts";

const StackFeeds = StackNavigator({
  Feeds: {
    screen: Feeds
  },
  Feed: {
    screen: Feed
  },
  Comments: {
    screen: Comments
  }
});

const stackProfile = StackNavigator({
  Profile: {
    screen: Profile
  },
  Post: {
    screen: Post
  },
  Feed: {
    screen: Feed
  }
});

const Tabview = TabNavigator(
  {
    Newsfeed: {
      screen: StackFeeds,
      navigationOptions: {
        tabBarIcon: <Icon name="md-paw" color="gray" size={25} />
      }
    },
    Profile: {
      screen: stackProfile,
      navigationOptions: {
        tabBarIcon: <Icon name="ios-home" color="gray" size={25} />
      }
    },
    Map: {
      screen: Map,
      navigationOptions: {
        tabBarIcon: <Icon name="md-pin" color="gray" size={25} />
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "white"
      },
      indicatorStyle: {
        backgroundColor: "white"
      },
      showIcon: true,
      showLabel: false
    },
    tabBarPosition: "bottom",
    animationEnabled: true
  }
);

const StackNav = StackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  Tabview: {
    screen: Tabview,
    navigationOptions: {
      header: null
    }
  }
});

export default StackNav;
