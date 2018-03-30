import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { globalStyles } from '../config/globalStyles';

export default class ScreenSmartApps extends Component {
    componentDidMount() {
      }
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <Text>screenSmartApps</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
}
)
