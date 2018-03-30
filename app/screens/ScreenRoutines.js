import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { globalStyles } from '../config/globalStyles';

export default class ScreenRoutines extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <Text>screenRoutines</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
}
)

