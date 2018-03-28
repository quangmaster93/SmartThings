//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';
import { NavigationActions } from 'react-navigation'
interface ScreenThingsState {
    isFocused: boolean;
}
export default class ScreenRooms extends Component<any, ScreenThingsState> {
    unsubscribe: Unsubscribe;
    constructor(props: any) {
        super(props);
        this.state = {
            isFocused: false,
            devices: []
        };
    }
    componentDidMount() {
        this.unsubscribe = AppStorage.subscribe((state) => {
            switch (state.event) {
                case "SET_FOCUSED_SCREEN":
                if(AppStorage.getState().focusedRoute == "ScreenRooms"){
                    this.props.screenProps.setParams({ screen: "ScreenRooms" })
                    if (this.state.isFocused == false) {
                        this.setState({ isFocused: true });
                        console.log("rerendered");
                    }
                }                    
            }
        })
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return <View>
            {this.state.isFocused && <Text>screenRooms</Text>}
        </View>
    };
}
