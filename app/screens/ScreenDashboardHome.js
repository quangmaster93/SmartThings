import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import UsersApi from '../api/UsersApi';
import { globalStyles } from '../config/globalStyles';

export default class ScreenDashboardHome extends Component {
    // static navigationOptions = {
    //     title: 'TCQ',
    //   }
    componentDidMount() {
        UsersApi.getUserProfile();
    }
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
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

const styles = StyleSheet.create({
    container: {
    },
}
)