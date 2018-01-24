import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class ScreenDashboardHome extends Component {
    static navigationOptions = {
        title: 'Home',
      }
    render() {
        return (
            <View>
                <Text>screenDashboardHome</Text>
            </View>
        );
    }
}

