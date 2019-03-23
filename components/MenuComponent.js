import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class MenuComponent extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.bar}>
        
                <TouchableHighlight
                underlayColor='#ffa161'
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Home')}>
                    <Text>Search</Text>
                </TouchableHighlight>

                <TouchableHighlight
                underlayColor='#ffa161'
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Favourites')}>
                    <Text>Favourite Artists</Text>
                </TouchableHighlight>

                <TouchableHighlight
                underlayColor='#ffa161'
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Favourites')}>
                    <Text>Upcoming Shows</Text>
                </TouchableHighlight>

            </View>
        )
    }
}

const styles = StyleSheet.create({
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