import React from 'react';
import { StyleSheet, ImageBackground, Image, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'


import ArtistSearchComponent from "./components/ArtistSearchComponent"
import ArtistComponent from "./components/ArtistComponent"
import MenuComponent from "./components/MenuComponent"
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
  }
)

const AppContainer = createAppContainer(RootStack)


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

      	<ImageBackground
        source={require('./assets/background.jpg')}
        style={styles.bg}>

        	<Image 
            source={require('./assets/logo.png')}
            style={styles.logo}/>

          <MenuComponent />

        	<AppContainer />
      
      	</ImageBackground>  
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
  bg: {
        flexDirection: 'column',
        alignItems: 'center', 
        width:'100%',
        height:'100%',
    },
    logo: {
        width:200,
        height:200,
        marginTop:10,

    },
});
