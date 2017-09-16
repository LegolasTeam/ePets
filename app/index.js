import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";

// Reducer
import appReducer from "./reducers";

// Navigation
import StackNav from "./configNav";

import { bootstrap } from "./utils/bootstrap";

bootstrap();

class AppNavigator extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <StackNav
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.navReducer
          })}
        />
      </View>
    );
  }
}
// Map state  to props
const AppNavigation = connect(state => {
  var navReducer = state.navReducer;
  return { navReducer };
})(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(appReducer)}>
        <AppNavigation />
      </Provider>
    );
  }
}
