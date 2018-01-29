import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    AsyncStorage
} from 'react-native';

export default class ScreenMyAccount extends Component {
    LogOut=()=> {
        console.log('remove token');
        AsyncStorage.removeItem('@token:key')
        .then(() => {
            this.props.navigation.navigate("ScreenLogin");
        });
        
    }
    render() {
        return (
            <View>
                <Text>ScreenMyAccount</Text>
                <Button title="Log out" onPress={()=>{this.LogOut()}}></Button>
            </View>
        );
    }
}

