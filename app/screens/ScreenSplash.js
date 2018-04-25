import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { globalStyles } from '../config/globalStyles';
export default class ScreenSplash extends Component {
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <Text style={styles.welcomeText}>Welcome</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00BCD4"
    },
    welcomeText: {
        fontSize:25,
        color:"#ffffff"
    },
});
