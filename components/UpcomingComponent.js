import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ListView, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native';
import Permissions from 'react-native-permissions';


export default class UpcomingComponent extends Component {

    constructor() {
        super();
        this.state = {
            locationPermission: 'unknown',
            position: 'unknown',
        }
        this.fetchLocationID = this.fetchLocationID.bind(this)
        this.fetchNumPages = this.fetchNumPages.bind(this)
    }

    static navigationOptions ={
        tile: 'Upcoming',
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

    componentDidMount() {

        

        this._requestPermission();
        navigator.geolocation.getCurrentPosition((position) => {
            this.fetchLocationID(position.coords.longitude, position.coords.latitude)
        },
            (error) => alert(JSON.stringify(error)));
  
    }


    fetchLocationID(lng, lat) {
        fetch("https://api.songkick.com/api/3.0/search/locations.json?location=geo:" + encodeURIComponent(lat) + ',' + encodeURIComponent(lng) + "&apikey=7XGKU5ekAA1FiTOX")
            .then((response) => response.json())
            .then((response) => {
                this.fetchNumPages(response.resultsPage.results.location[0].metroArea.id)
            })
        
    }

    fetchNumPages(cityID) {
        fetch("https://api.songkick.com/api/3.0/metro_areas/" + encodeURIComponent(cityID) + "/calendar.json?apikey=7XGKU5ekAA1FiTOX")
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    numPages: Math.ceil(response.resultsPage.totalEntries / 50)
                })
                fetchConcerts()
            })

    }

    fetchConcerts() {

        var resultsList = []

        for (let i=1; i<this.state.numPages; i++) {

            fetch("https://api.songkick.com/api/3.0/metro_areas/27398/calendar.json?apikey=7XGKU5ekAA1FiTOX&page=" + encodeURIComponent(i))
                .then((response) => response.json())
                .then((response) => {
                    for (j=0; j<response.resultsPage.results.event.length; j++) {

                        if (this.props.favourites.includes(response.resultsPage.results.event[j].performance[0].displayName)) {
                            resultsList.push(response.resultsPage.results.event[j])
                        }
                    }
                })


        }

        
    }

    renderRow(task, sectionID, rowID, highlightRow) {
        return (
            <View style={styles.row}>
                <Text style={styles.text}>{task}</Text>
            </View>
        )
    }


    render() {

        const { navigation } = this.props;
        const favourites = navigation.getParam('favourites', 'no-favourites')
        const ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        })
        this.state = {
            favouriteDataSource: ds.cloneWithRows(favourites)
        }

        return (
            <View style={styles.display}>
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
                        onPress={() => this.props.navigation.navigate('Home', {favourites: favourites})}>
                            <Text>Search</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        underlayColor='#ffa161'
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Favourites', {favourites: favourites})}>
                            <Text>Favourite Artists</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        underlayColor='#ffa161'
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Upcoming', {favourites: favourites})}>
                            <Text>Upcoming Shows</Text>
                        </TouchableHighlight>

                    </View>

                    <ListView  
                    dataSource = {this.state.favouriteDataSource}
                    renderRow={this.renderRow}
                    />
                    
                </ImageBackground>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 20,
        backgroundColor: 'rgba(20,53,84,0.8)',
        marginTop: 8,
        width: '100%',
        
    },
    text: {
        flex:1,
        textAlign: 'center',
        color: 'white',
    },
    display: {
        borderRadius: 5,
        height:'100%',
        width: '100%' 
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