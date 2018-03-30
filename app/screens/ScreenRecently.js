import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { globalStyles } from '../config/globalStyles';

export default class ScreenRecently extends Component {
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <Text>ScreenRecently</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
    },
}
)

