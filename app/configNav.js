import { StackNavigator } from "react-navigation";

// Screens
import Login from "./components/account/login";
import Signup from "./components/account/signup";

const StackNav = StackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  }
});

export default StackNav;
