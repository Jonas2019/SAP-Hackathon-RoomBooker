import React, { Component } from 'react';
import {AppRegistry, Text, View, TouchableHighlight} from 'react-native';

export default class componentNavi extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Details</Text>
      </View>
  );
  }
}

AppRegistry.registerComponent('componentNavi', ()=> componentNavi);
