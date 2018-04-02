//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';
import { NavigationActions } from 'react-navigation'
import { globalStyles } from '../config/globalStyles';
export default class ScreenAddRoom extends Component<any, any> {
    unsubscribe: Unsubscribe;
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return <View style={[globalStyles.container, styles.container]}>

        </View>
    };
}
const styles = StyleSheet.create({
    container: {

    }
}
)
