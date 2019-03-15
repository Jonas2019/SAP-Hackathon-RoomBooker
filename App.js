import React from "react";
import { SectionList, StyleSheet, Button, View, Text, AppRegistry, TextInput, ScrollView, TouchableOpacity} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SearchInput, { createFilter } from 'react-native-search-filter';
import {SearchBar} from 'react-native-elements';
import Component3 from './app/components/Component3';
import RoomDetailsScreen from './screens/RoomDetailsScreen.js'

class HomeScreen extends React.Component {
    state={
        search: '',
    };
    updateSearch=search=>{
    this.setState({search});
    };
    onPress(name){
        this.props.navigator.push({
        floorNum: 1,
        roomId:name
    });
    }
  render() {
      const {search} = this.state;
    return (
        <View style={styles.container}>
        <View>
        <SearchBar
        placeholder="Type here"
        onChangeText={this.updateSearch}
        value={search}
        />
        </View>
        <View>
            <Text>You have entered:{this.state.search}</Text>
        </View>
        <View>
        <Component3 />
        </View>
        <View>
            <SectionList
                sections={[
                    {floor: '1', rooms: ['Davie','West Van', 'YVR']},
                    {floor: '2', rooms: ['Capilano','Canada Place']},
                ]}

                renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({section})=><Text style={styles.sectionHeader}>{section.floor}</Text>}
                keyExtractor={(item,index) => index}

            />
        </View>
        <View style={{position:"absolute", left:0, right:0, bottom:20}}>
        <Button
          title="Go to Scan"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Scan', {
              itemId: 86,
              otherParam: 'This is just to test that I can give you the room name through navigation',
            });
          }}
        />
        </View>
      </View>
    );
  }
}

class ScanScreen extends React.Component {
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'anything');
    const otherParam = navigation.getParam('otherParam', 'Can I write anything?');

    return (
      <View>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>Room Name: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Home Page"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Scan: ScanScreen,
  },
  {
    initialRouteName: "Home"
  }
);


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer navigator=AppNavigator/>;
  }
}
