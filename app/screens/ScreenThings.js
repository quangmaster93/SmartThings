//@flow
import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';
import { Device } from '../models/Device';
import Network from '../api/Network';
import MessagesApi from '../api/MessagesApi';
import { globalStyles } from '../config/globalStyles';
import ThingsComponent from '../Components/ThingsComponents'

interface ScreenThingsState {
    isFocused: boolean;
    devicesString: string;
}

export default class ScreenThings extends Component<any, ScreenThingsState> {
    unsubscribe: Unsubscribe;
    state: ScreenThingsState;
    ws: any;
    constructor(props: any) {
        super(props);
        let dvs = props.screenProps.state.params != null ? props.screenProps.state.params.devices : "";
        this.state = {
            isFocused: !!dvs,
            devicesString: dvs
        };
    }

    componentDidMount() {
        let self = this;
        this.unsubscribe = AppStorage.subscribe((state) => {
            switch (state.event) {
                case "SET_FOCUSED_SCREEN":
                    if (AppStorage.getState().focusedRoute == "ScreenThings") {
                        this.props.screenProps.setParams({ screen: "ScreenThings" })
                    }

                    if (this.state.isFocused == false && AppStorage.getState().focusedRoute == "MyhomeStack") {
                        if (!this.props.screenProps.state.params || !this.props.screenProps.state.params.devices) {
                            let devices = AppStorage.getState().userDevices.map((device) => {
                                return device.id;
                            });
                            let devicesId: string = devices.join(",");
                            this.setState({ devicesString: devicesId, isFocused: true });
                        }
                    }
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return <View style={globalStyles.container}>
            {this.state.isFocused &&
                <ThingsComponent  {...this.props} devices={this.state.devicesString} ></ThingsComponent>
            }
        </View>
    }
}
