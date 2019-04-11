import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, Button, StyleSheet } from 'react-native';




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
                    pic: response.artist.image[4]["#text"],
                })
            })

    }





    render() {
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'no-name');
        this.fetchInfo(name);
        return (
            <View style = {styles.container}>
                
                <Text style={styles.title}>{name}</Text>
           
                <Image
                source = {{uri: this.state.pic}}
                style= {styles.image}
                />

                <Text style={styles.text}>{this.state.bio}</Text>


                <Image
                source={require('./images/logoline.png')}
                style={styles.footer}
                />
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff0',
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        flex: 5,
        padding: '10%'
    },
    title: {
        flex: 2,
        width: '100%',
        top: '5%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 36,
        resizeMode: 'contain'
    },
    image: {
        width: '80%',
        height: '100%',
        flex: 4,
        borderRadius: 20
    },
    footer: {
        flex: 2,
        width: '80%',
        height: '100%',
        resizeMode: 'contain'
    }
})