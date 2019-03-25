import React from 'react';
import { StyleSheet, ImageBackground, Image, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'

import ArtistSearchComponent from "./components/ArtistSearchComponent"
import ArtistComponent from "./components/ArtistComponent"
import FavouritesComponent from "./components/FavouritesComponent"
import UpcomingComponent from "./components/UpcomingComponent"


const MainStack = createStackNavigator({
  Home: {
    screen: ArtistSearchComponent
  },
  Favourites: {
    screen: FavouritesComponent
  },
  Upcoming: {
  	screen: UpcomingComponent
  }
},
  {
  	headerMode: 'none',
    initialRouteName: 'Home',
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Modal: {
      screen: ArtistComponent
    },
  },
  {
    mode: 'modal',
    headerMode: 'none'
  },
)

const AppContainer = createAppContainer(RootStack)


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

      		<AppContainer />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex:1,
    justifyContent: 'center',
  },
});
