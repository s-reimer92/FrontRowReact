import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View,Image, StyleSheet, ImageBackground, TextInput, Button, TouchableHighlight } from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import Permissions from 'react-native-permissions';


export default class ArtistSearchComponent extends Component {

    constructor() {
        super();
        this.state = {
            input: null,
            searchResults: [],
            favourites: [],
            concerts: [],
            locationPermission: 'unknown',
            position: 'unknown',
        }
        this.fetchArtists = this.fetchArtists.bind(this)
    }

    //Sets page name
    static navigationOptions ={
        tile: 'Home',
    }

    //Opens search results
    showActionSheet = () => {
        this.ActionSheet.show()
    } 

    _requestPermission() {
        Permissions.request('location')
            .then(response => {
                this.setState({
                    locationPermission: response
                })
                //console.log("Response: " + response);
            })
    }

    //Request Permission and get Location
    componentDidMount() {
        this._requestPermission();
        navigator.geolocation.getCurrentPosition((position) => {
            this.fetchLocationID(position.coords.longitude, position.coords.latitude)
        },
            (error) => alert(JSON.stringify(error)));
    }

    //Get Songkick location ID
    fetchLocationID(lng, lat) {
        console.log('fetching location ID');
        fetch("https://api.songkick.com/api/3.0/search/locations.json?location=geo:" + encodeURIComponent(lat) + ',' + encodeURIComponent(lng) + "&apikey=7XGKU5ekAA1FiTOX")
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    locationID: response.resultsPage.results.location[0].metroArea.id
                })
            })
    }

    //Get local shows for an artist
    fetchArtistShows(cityID, artist) {
        console.log(cityID);
        console.log(artist);
        fetch("https://api.songkick.com/api/3.0/events.json?apikey=7XGKU5ekAA1FiTOX&artist_name=" + encodeURIComponent(artist) + "&location=sk:" + encodeURIComponent(cityID))
            .then((response) => response.json())
            .then((response) => {
                if (response.resultsPage.totalEntries > 0) {
                    console.log('adding show');
                    var newConcerts = this.state.concerts
                    newConcerts.push(response.resultsPage.results.event[0].displayName)
                    this.setState({
                        concerts: newConcerts
                    })
                }
                
            })
    }

    //Gets top 10 search results from last.fm API
    fetchArtists() {
        if (this.state.input != null) {
            fetch('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + encodeURIComponent(this.state.input) + '&api_key=e006c67d7936e45b2cfa8fed71da22a6&format=json')
                .then((response) => response.json())
                .then((response) => { 

                    var searchResults = ['Cancel'];
                    for (var i=0; i<response.results.artistmatches.artist.length; i++) {
                        searchResults.push(response.results.artistmatches.artist[i].name)
                    }
            
                    if (searchResults.length > 11) {
                        searchResults.length = 11;
                    }
                    this.setState({
                        searchResults: searchResults
                    })
                    this.showActionSheet()
            })
        }
    }

    render() {
        return (
            <View>

                <ImageBackground
                source={require('./images/background.jpg')}
                style={styles.bg}>

                    <Image 
                    source={require('./images/logo.png')}
                    style={styles.logo}/>

                    <View style={styles.bar}>
        
                        <TouchableHighlight
                        underlayColor='#ffa161'
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Home', {favourites: this.state.favourites, concerts: this.state.concerts})}>
                            <Text>Search</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        underlayColor='#ffa161'
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Favourites', {favourites: this.state.favourites, concerts: this.state.concerts})}>
                            <Text>Favourite Artists</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        underlayColor='#ffa161'
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Upcoming', {favourites: this.state.favourites, concerts: this.state.concerts})}>
                            <Text>Upcoming Shows</Text>
                        </TouchableHighlight>

                    </View>

                    <TextInput style={styles.input}
                    placeholder="  Enter your Favourite Band"
                    value={this.state.input} 
                    onChangeText={(value) => this.setState({
                        input: value
                    })}/>

                    <Button 
                    color= '#143554'
                    onPress={this.fetchArtists}
                    title='Search'/>

                    <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={<Text style={{color: '#000', fontSize: 18}}>Search Results</Text>}
                    options={this.state.searchResults}
                    cancelButtonIndex={0}
                    onPress={(index) => { 
                        var newFavourites = this.state.favourites;
                        if (index != 0 && !newFavourites.includes(this.state.searchResults[index])) {
                            newFavourites.push(this.state.searchResults[index])
                            this.setState({
                                favourites: newFavourites
                            })
                            this.fetchArtistShows(this.state.locationID, this.state.searchResults[index])
                            console.log(this.state.concerts);
                        }

                    }}/>

                </ImageBackground>       

            </View>
        )
    }
}

const styles = StyleSheet.create({    
    input: {
        height:50,
        width:250,
        borderColor: '#ff8a3a',
        borderWidth: 2,
        paddingLeft:10,
        fontSize:18,
        marginBottom:25,
        backgroundColor: 'white'   
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
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width:'100%',
        height:40,
        backgroundColor: 'rgba(20,53,84,0.5)',
        marginTop: -20,
        marginBottom: 25,    
    },
    button: {
        width: '32%',
        height: '82%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#ff8a3a',
    }
})