import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ListView, StyleSheet, TouchableHighlight, ImageBackground, Image } from 'react-native';

  

export default class FavouritesComponent extends Component {

    constructor() {
        super();
        this.pressRow = this.pressRow.bind(this);
        this.renderRow = this.renderRow.bind(this)
    }

    static navigationOptions ={
        tile: 'Favourites',
    }

    pressRow(rowID) {
        console.log('Row number ' + rowID);;
    }

    renderRow(task, sectionID, rowID, highlightRow) {
        return (
            <TouchableHighlight onPress={() => {
                //This will bring up a modal with band info and a spotify player
                this.pressRow(rowID);
                highlightRow(sectionID, rowID);
            }}>
                <View style={styles.row}>
                    <Text style={styles.text}>{task}</Text>
                </View>
            </TouchableHighlight>
        )
    }

   

    render() {

        const { navigation } = this.props;
        const favourites = navigation.getParam('favourites', 'no-favourites');
        console.log(favourites);
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