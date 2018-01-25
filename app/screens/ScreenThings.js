import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class ScreenThings extends Component {
    componentDidMount() {
        console.log("ScreenThings");
      }
    render() {
        return (
            <View>
                <Text>screenThings</Text>
            </View>
        );
    }
}

