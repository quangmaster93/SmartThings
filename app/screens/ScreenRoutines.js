import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class ScreenRoutines extends Component {
    componentDidMount() {
    }
    render() {
        console.log(this.props);
        return (
            <View>
                <Text>screenRoutines</Text>
            </View>
        );
    }
}

