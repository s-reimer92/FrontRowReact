import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View,Image, StyleSheet, ImageBackground, TextInput, Button } from 'react-native';
import ActionSheet from 'react-native-actionsheet'



export default class ArtistSearchComponent extends Component {

    constructor() {
        super();
        this.state = {
            input: null,
            artistList: [],
            favourites: [],
        }
        this.fetchArtists = this.fetchArtists.bind(this)
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    } 

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
                        artistList: searchResults
                    })
                    this.showActionSheet()
            })
        }
    }

    render() {
        return (
            <View>

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
                options={this.state.artistList}
                cancelButtonIndex={0}
                onPress={(index) => { 
                    var newFavourites = this.state.favourites;
                    if (index != 0 && !newFavourites.includes(this.state.artistList[index])) {
                        newFavourites.push(this.state.artistList[index])
                        this.setState({
                            favourites: newFavourites
                        })
                    }

                }}/>

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
        
    }
})