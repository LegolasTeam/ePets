import { StackNavigator, TabNavigator } from "react-navigation";

// Screens
import Login from "./components/account/login";
import Signup from "./components/account/signup";

import Feed from "./components/newfeeds/feed";
import Feeds from "./components/newfeeds/feeds";
import Comments from "./components/comments";
import Profile from "./components/profile";
import Map from "./components/map";

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

const Tabview = TabNavigator(
  {
    Newsfeed: {
      screen: StackFeeds
    },
    Profile: {
      screen: Profile
    },
    Map: {
      screen: Map
    }
  },
  {
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
