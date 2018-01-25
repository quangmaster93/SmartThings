import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class ScreenSlideMenu extends Component {
    render() {
        console.log("ScreenSlideMenu");
        console.log(this.props);
        return (
            <View>
                <Text>screenSlideMenu</Text>
                <Button title="Home" onPress={() => { this.props.navigation.navigate('RootTab') }}></Button>
                <Button title="My Account" onPress={ ()=>{this.props.navigation.navigate("MyAccountStack") }}></Button>
                <Button title="Support" onPress={ ()=>{this.props.navigation.navigate("SupportStack") }}></Button>
            </View>
        );
    }
}

