import React from 'react';
import { ScrollView, StyleSheet, Text, ListView, View, TouchableHighlight } from 'react-native';
import UrlPath from "../constants/UrlPath"

export default class RoomDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'RoomDetails',
  };

  constructor(props) {
    super(props);
    this.state = {
      floorNum: this.props.navigation.getParam('floorNum', 1),
      roomDetails: this.props.navigation.getParam('roomDetails', {}),
    };
  }

  isRoomOccupied(busy) {
    if (busy) {
      return "Occupied"
    } else {
       return "Free"
    }
  }

  requestToBookRoom() {
    console.log("sending a request to" + UrlPath.url + "/event/" + this.state.floorNum + "/" + this.state.roomDetails.name)
    fetch(UrlPath.url + "/event/" + this.state.floorNum + "/" + this.state.roomDetails.name, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      params: JSON.stringify({
        floorId: this.state.floorNum,
        roomName: this.state.roomDetails.name,
      }),
      })
      .then((response) => {
        console.log(response._bodyText)
        alert(response._bodyText);
      })
  }

  bookRoom() {
    this.requestToBookRoom()
    const {navigate} = this.props.navigation;
    navigate('Home');
  }

  render() {
    console.log("Switched to room details page for floor " + this.state.floorNum + " room " + JSON.stringify(this.state.roomDetails))
    return (
    <View>
      <Text style={styles.text}>Name: {this.state.roomDetails.name}</Text>
      <Text style={styles.text}>Capacity: {this.state.roomDetails.capacity}</Text>
      <Text style={styles.text}>Status: {this.isRoomOccupied(this.state.roomDetails.busy)}</Text>
      <View style={{paddingTop:200, height:300}}>
            <TouchableHighlight style={styles.button} onPress={() => {this.bookRoom()}}>
                <Text style={styles.buttonText}>Book Room?</Text>
            </TouchableHighlight>
            <View style = {{flex: 1}}/>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  text: {
    fontSize:26,
    fontWeight:'bold',
  },
  button: {
    backgroundColor: 'purple',
    flex: 2
  },
  buttonText: {
    fontSize: 25,
    fontWeight:'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1
  }
});
