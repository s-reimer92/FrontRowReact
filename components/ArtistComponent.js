import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, Button, StyleSheet } from 'react-native';
import SpotifyPlayer from 'react-spotify-player';


export default class ArtistComponent extends Component {

    constructor() {
        super();
        this.state = {
            bio: null,
            pic: null,
        }
        this.fetchInfo = this.fetchInfo.bind(this)
    }

    fetchInfo(name) {
        fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + encodeURIComponent(name) + '&api_key=e006c67d7936e45b2cfa8fed71da22a6&format=json')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    bio: response.artist.bio.summary,
                    pic: response.artist.image[2]["#text"],
                })
            })

    }


    render() {
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'no-name');
        this.fetchInfo(name);
        return (
            <View style = {styles.container}>
                
                <Text style={styles.title}>{this.state.pic}</Text>
           
                <Image
                    source = {{uri: this.state.pic}}
                    style= {{
                        width: '100%',
                        height: '100%',
                        flex: 2
                    }}
                />

                <Text style={styles.text}>{this.state.bio}</Text>

              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ff0',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection:'column'
    },
    text: {
        flex:2,
    },
    title: {
        flex:1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
})