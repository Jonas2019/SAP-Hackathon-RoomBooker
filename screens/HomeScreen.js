import React from "react";
import { SectionList, StyleSheet, Button, ListView, View, Text, AppRegistry, TextInput, ScrollView, TouchableHighlight} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SearchInput, { createFilter } from 'react-native-search-filter';
import UrlPath from "../constants/UrlPath"
import {SearchBar} from 'react-native-elements';
import RoomsDetailsScreen from './RoomDetailsScreen';

export default class HomeScreen extends React.Component {

  sortByFree(rooms) {
    return rooms.sort((x,y) => x.busy)
  }

  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const roomList = [
      {"name": "pineapple","capacity": 5,"busy": true},
      {"name": "cake","capacity": 5,"busy": false},
      {"name":"biscuit","capacity": 5,"busy": true},
      {"name": "cupcake","capacity": 5,"busy": false},
      {"name": "cookie","capacity": 5,"busy": true},
      {"name": "pasta","capacity": 5,"busy": false}
    ];
    this.state = {
        search: '',
        rooms: roomList,
        isFocused: false,
        userDataSource: ds.cloneWithRows(this.sortByFree(roomList)),
    };
  }

  fetchRooms(floorNum) {
    fetch(UrlPath.url + "/floors/" + floorNum)
      .then((response) => response.json())
      .then((response) => {
        console.log("\n\nrequest succeeded, got response " + JSON.stringify(response) + "\n\n")
        this.setState({
          rooms: response,
          userDataSource: this.state.userDataSource.cloneWithRows(this.sortByFree(response)),
        })
      })
  }
  
  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener("didFocus", () => {
        this.setState({ isFocused: true })
        this.fetchRooms(1);
      }),
      this.props.navigation.addListener("willBlur", () => {
        this.setState({ isFocused: false })
      })
    ];
  }
  
  updateSearch=search=>{
    this.setState({search});
    this.setState({userDataSource: this.state.userDataSource.cloneWithRows(this.sortByFree(this.state.rooms).filter(x => x.name.startsWith(search.toLowerCase())))});
  };

  onPressRow(room){
    const {navigate} = this.props.navigation;
    navigate('RoomDetails', {floorNum: 1, roomDetails: room});
  }

  renderRow(room, sectionId, rowId, highlightRow){
    var occupied;
    if (room.busy) {
      occupied="Occupied"
    } else {
      occupied="Free!"
    }

    return(
        <TouchableHighlight onPress={() => {this.onPressRow(room)}}>
        <View style={styles.row}>
            <Text style={styles.rowText}>{room.name} </Text> 
            <Text style={(room.busy) ?  styles.occupiedText : styles.notOccupiedText}>{occupied}</Text>
        </View>
        </TouchableHighlight>
    )
  }
  
  onPressQRButton(){
    const {navigate} = this.props.navigation;
    navigate('Scan', {roomDetails: this.state.rooms});
  }

  render() {
    const {search} = this.state;
    return (
        <View>
          <SearchBar
          placeholder="Type here"
          onChangeText={this.updateSearch}
          value={search}
          />
          <ListView 
              dataSource={this.state.userDataSource}
              renderRow={this.renderRow.bind(this)}
          />
          <View style={{paddingTop:200, height:300}}>
            <TouchableHighlight style={styles.button} onPress={() => {this.fetchRooms(1)}}>
                <Text style={styles.buttonText}>Reload Rooms?</Text>
            </TouchableHighlight>
            <View style = {{flex: 1}}/>

            <TouchableHighlight style={styles.button} onPress={() => {this.onPressQRButton()}}>
              <Text style={styles.buttonText}>Switch to QR</Text>
            </TouchableHighlight>
          </View>
        </View>
        );
  }
}

    //TODO: make noor chan change this god awful styling later
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection:'row',
    justifyContent:'center',
    padding:10,
    backgroundColor: '#f4f4f4',
    marginBottom:3
  },
  rowText: {
    fontSize:16,
    fontWeight:'bold',
    flex:1
  },
  occupiedText: {
    fontSize:16,
    fontWeight:'bold',
    flex:1,
    textAlign:'right',
    color: 'red'
  },
  notOccupiedText: {
    fontSize:16,
    fontWeight:'bold',
    flex:1,
    textAlign:'right',
    color: 'green'
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
})