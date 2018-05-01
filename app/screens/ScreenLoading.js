//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { globalStyles } from '../config/globalStyles';
export default class ScreenLoading extends Component<any,any> {
    componentWillUnmount() {
        console.log("ScreenLoading unmount");
    }
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <Text>Loading</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
}
)
