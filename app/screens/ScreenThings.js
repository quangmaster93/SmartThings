//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';
import { Device } from '../models/Device';
import UsersApi from '../api/UsersApi';

interface ScreenThingsState {
    isFocused: boolean;
    devices: Array<Device>;
}

export default class ScreenThings extends Component<any, ScreenThingsState> {
    unsubscribe: Unsubscribe;
    constructor(props: any) {
        super(props);
        this.state = {
            isFocused: false,
            devices: []
        };
    }
    componentDidMount() {
        let self = this;
        this.unsubscribe = AppStorage.subscribe((state) => {
            switch (state.event) {
                case "SET_FOCUSED_SCREEN":
                    if (this.state.isFocused == false && AppStorage.getState().focusedRoute == "MyhomeStack") {
                        this.setState({ isFocused: true });
                        console.log("rerendered");
                        UsersApi.getUserDevices((data) => {
                            self.setState({ devices: data });
                        })
                    }
            }
        })
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return <View>
            {/* {this.state.isFocused && <Text>screenThings</Text>} */}
            <FlatList data={this.state.devices}
                renderItem={({ item }) => <DeviceListItem info={item} />}
                keyExtractor={(item) => item.id}>
            </FlatList>
        </View>
    }
}

interface DeviceListItemProps {
    info: Device;
}

class DeviceListItem extends Component<DeviceListItemProps, any> {

    render() {
        let styles = deviceListItemStyles;
        return <View style={styles.container}>
            <View>
                <Image style={styles.icon} source={require('../image/light.png')} />
            </View>
            <View>
                <Text style={styles.title}>{this.props.info.name}</Text>
            </View>

        </View>
    }
}

const deviceListItemStyles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 20,
        flexDirection: "row",
    },
    title: {
        fontSize: 16,
    },
    activeTitle: {
        color: 'red',
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
});

