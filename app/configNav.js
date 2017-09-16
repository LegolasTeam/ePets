import { StackNavigator } from "react-navigation";

// Screens
import Home from "./components/index";
import Login from "./components/account/login";

const StackNav = StackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  }
});

export default StackNav;
