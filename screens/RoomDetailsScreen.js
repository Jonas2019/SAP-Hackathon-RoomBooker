import React from 'react';
import { ScrollView, StyleSheet, Text, ListView, View } from 'react-native';

export default class RoomDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'RoomDetails',
  };

  constructor(props) {
    super(props);
    this.state = {
      floorNum: this.props.floorNum,
      roomId: this.props.roomId,
      rooms:[]
    };
  }

  fetchRooms(floorNum) {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          rooms: response,
        });
        return response;
      });
  }

  updateRooms(floorNum) {
    this.fetchRooms(floorNum);
  }

  renderRow(user, sectionId, rowId, highlightRow){
      return(
          <View style={styles.row}>
              <Text style={styles.rowText}>{JSON.stringify(user)}</Text>
          </View>
      )
  }

  render() {
    return (
      // <ListView
      //   dataSource={this.state.rooms}
      //   renderRow={this.renderRow.bind(this)}/>
          <Text onPress={this.updateRooms(this.state.floorNum)}>{JSON.stringify(this.state.rooms[this.state.roomId])}</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
