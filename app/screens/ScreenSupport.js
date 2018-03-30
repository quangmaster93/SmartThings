import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { globalStyles } from '../config/globalStyles';
export default class ScreenSupport extends Component {
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <Text>ScreenSupport</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
}
)
