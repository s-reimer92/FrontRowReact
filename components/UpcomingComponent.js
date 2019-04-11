import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ListView, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native';



export default class UpcomingComponent extends Component {

    constructor() {
        super();
        this.renderRow = this.renderRow.bind(this)
    }

    static navigationOptions ={
        tile: 'Upcoming',
    }


    renderRow(task) {
        return (
            <View style={styles.row}>
                <Text style={styles.text}>{task}</Text>
            </View>
        )
    }


    render() {

        const { navigation } = this.props;
        const favourites = navigation.getParam('favourites', 'no-favourites');
        const concerts = navigation.getParam('concerts', 'no-concerts')

        const ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        })
        this.state = {
            concertDataSource: ds.cloneWithRows(concerts)
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
                        onPress={() => this.props.navigation.navigate('Home', {favourites: favourites, concerts: concerts})}>
                            <Text>Search</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        underlayColor='#ffa161'
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Favourites', {favourites: favourites, concerts: concerts})}>
                            <Text>Favourite Artists</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        underlayColor='#ffa161'
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Upcoming', {favourites: favourites, concerts: concerts})}>
                            <Text>Upcoming Shows</Text>
                        </TouchableHighlight>

                    </View>



                        <ListView  
                        dataSource = {this.state.concertDataSource}
                        renderRow={this.renderRow} />

                            
                  
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
    loading: {  
        width:250,
        height:250
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