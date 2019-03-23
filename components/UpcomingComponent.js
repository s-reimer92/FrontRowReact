import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

export default class UpcomingComponent extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    static navigationOptions ={
        tile: 'Upcoming',
    }

    render() {
        return (
            <View>
            <Text>Test</Text>
            </View>
        )
    }
}