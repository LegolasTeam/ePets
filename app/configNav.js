import { StackNavigator } from "react-navigation";

// Screens
import Login from "./components/account/login";
import Signup from "./components/account/signup";
import Feed from "./components/newfeeds/feed";
import Feeds from "./components/newfeeds/feeds";
import Comments from './components/comments'

const StackNav = StackNavigator({
  Feed: {
    screen: Feed
  },
  Comments: {
    screen: Comments
  },
  Feeds: {
    screen: Feeds
  },
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  }
});

export default StackNav;
