import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class ScreenLogin extends Component {
    render() {
        return (
            <View>
                <Text>screenLogin</Text>
                <Button onPress={ ()=>{this.props.navigation.navigate("RootApp") }} title="Login"/>
            </View>
        );
    }
}

