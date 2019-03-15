import React from "react";
import {AppRegistry} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './screens/HomeScreen.js'
import RoomDetailsScreen from './screens/RoomDetailsScreen.js';
import ScanScreen from './screens/ScanScreen';

const AppNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    RoomDetails: {screen: RoomDetailsScreen},
    Scan: {screen: ScanScreen}
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}