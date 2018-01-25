import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class ScreenRooms extends Component {
    componentDidMount() {
        console.log("ScreenRooms");
      }
    render() {
        return (
            <View>
                <Text>screenRooms</Text>
            </View>
        );
    }
}

