import { StackNavigator, TabNavigator } from "react-navigation";

// Screens
import Login from "./components/account/login";
import Signup from "./components/account/signup";
import Newsfeed from "./components/newfeeds";
import Profile from "./components/profile";

const Tabview = TabNavigator(
  {
    Newsfeed: {
      screen: Newsfeed
    },
    Profile: {
      screen: Profile
    }
  },
  {
    tabBarPosition: "top",
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
