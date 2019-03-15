import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';

export default class BarcodeScannerExample extends React.Component {

    state = {
        hasCameraPermission: null,
        defaultReturn: {"name": "pineapple","capacity": 5,"busy": true},
      };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    this.setState({rooms: this.props.navigation.getParam('roomDetails', {})});
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  getRoom(roomId) {
    let room = this.state.rooms.find(x => x.name == roomId);

    if (room === undefined) {
        room = this.state.defaultReturn;
    }

    alert(`Navigating to room ` + room.name);
    const resetAction = StackActions.reset({
        index: 1,
        actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
            NavigationActions.navigate({ routeName: 'RoomDetails', params:{roomDetails: room} }),
        ],
        });
        this.props.navigation.dispatch(resetAction);
    }

  handleBarCodeScanned = ({ type, data }) => {
    console.log("code scanned with value: " + data)
    this.getRoom(data);
  }
}