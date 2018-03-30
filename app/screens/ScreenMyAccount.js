import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    AsyncStorage,
    StyleSheet
} from 'react-native';
import { globalStyles } from '../config/globalStyles';

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
            <View style={[globalStyles.container, styles.container]}>
                <Text>ScreenMyAccount</Text>
                <Button title="Log out" onPress={()=>{this.LogOut()}}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
}
)
