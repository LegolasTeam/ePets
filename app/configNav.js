import { StackNavigator } from "react-navigation";

// Screens

import Home from "./components/index";

const StackNav = StackNavigator({
  Home: {
    screen: Home
  }
});

export default StackNav;
