// @flow
import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Switch,
    DeviceEventEmitter,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

export class ScreenRoutineDetail extends Component<any, any> {
    render() {
        return <View>
            <Text>{JSON.stringify(this.props.screenProps)}</Text>
        </View>
    }
}
