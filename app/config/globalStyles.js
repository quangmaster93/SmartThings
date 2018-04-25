import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';
export let globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff'
    },
    headerStyle:{
        height:75.5,
        backgroundColor:'#005891',
        paddingTop:10
    },
    menuIcon: {
        width: 32,
        height: 22,
        marginLeft: 10
    },
    headerTitle: {
        color: "#ffffff",
        fontSize: 19,
        marginLeft: 12,
        marginTop: 5
    },

    headerRightIcon: {
        width: 30,
        height: 30,
        marginRight: 30
    }, 
    addIcon:{
        width: 20,
        height: 20,
        marginRight: 30
    },
    headerBg:{
        flex:1,
        resizeMode:"contain",
        width:null,
        height:null
    },
    underLineTabStyle:{
        backgroundColor: '#005891',
        height:1
    },
    commonText:{
        fontSize:16
    }
}
)
