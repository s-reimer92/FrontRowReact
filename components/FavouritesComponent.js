import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ListView, StyleSheet, TouchableHighlight } from 'react-native';


const favourites = [
    {
        name: 'Belle & Sebastian'
    },
    {
        name: 'Phoebe Bridgers'
    },
    {
        name: 'Nick Cave & the Bad Seeds'
    },
    {
        name: 'Hippo Campus'
    },
    {
        name: 'Belle & Sebastian'
    },
    {
        name: 'Phoebe Bridgers'
    },
    {
        name: 'Nick Cave & the Bad Seeds'
    },
    {
        name: 'Hippo Campus'
    },
];

export default class FavouritesComponent extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        })
        this.state = {
            favouriteDataSource: ds.cloneWithRows(favourites)
        }
        this.pressRow = this.pressRow.bind(this);
        this.renderRow = this.renderRow.bind(this)
    }

    pressRow(rowID) {
        console.log('Row number ' + rowID);;
    }

    renderRow(task, sectionID, rowID, highlightRow) {
        return (
            <TouchableHighlight onPress={() => {
                this.pressRow(rowID);
                highlightRow(sectionID, rowID);
            }}>
                <View style={styles.row}>
                    <Text style={styles.text}>{task.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }

   

    render() {
        return (
            <View style={styles.display}>
                <ListView  
                    dataSource = {this.state.favouriteDataSource}
                    renderRow={this.renderRow}
                />
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
        height:400,
        width: 250 
    }
})