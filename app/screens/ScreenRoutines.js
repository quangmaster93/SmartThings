import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class ScreenRoutines extends Component {
    componentDidMount() {
        console.log("ScreenRoutines");
      }
    render() {
        return (
            <View>
                <Text>screenRoutines</Text>
            </View>
        );
    }
}

