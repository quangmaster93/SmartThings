import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import UsersApi from '../api/UsersApi';

export default class ScreenDashboardHome extends Component {
    static navigationOptions = {
        title: 'Home',
      }
      componentDidMount() {
          UsersApi.getUserProfile();
      }
    render() {
        return (
            <View>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
            </View>
        );
    }
}

