import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import { globalStyles } from '../config/globalStyles';
export default class ScreenSlideMenu extends Component {
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <Text>screenSlideMenu</Text>
                <Button title="Home" onPress={() => { this.props.navigation.navigate('RootTab') }}></Button>
                <Button title="My Account" onPress={ ()=>{this.props.navigation.navigate("MyAccountStack") }}></Button>
                <Button title="Support" onPress={ ()=>{this.props.navigation.navigate("SupportStack") }}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
}
)