import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, Button } from 'react-native';

var img = null;

export default class ArtistComponent extends Component {

    constructor() {
        super();
        this.state = {
            bio: null,
            pic: null,
            name: 'Cher'
        }
        this.fetchInfo = this.fetchInfo.bind(this)
    }

    fetchInfo() {
        fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + encodeURIComponent(this.state.name) + '&api_key=e006c67d7936e45b2cfa8fed71da22a6&format=json')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    bio: response.artist.bio.summary,
                    pic: response.artist.image[2]["#text"],
                })
                console.log(this.state.pic);
            })

    }


    render() {
        return (
            <View>
                <Image
                source={{uri: this.state.pic}}
                style={{height:150, width:150}} />

                <Text>{this.state.bio}</Text>

                <Button 
                color= '#143554'
                onPress={this.fetchInfo}
                title='Search'/>

            </View>
        )
    }
}