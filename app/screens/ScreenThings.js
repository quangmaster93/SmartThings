//@flow
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
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';
import { Device } from '../models/Device';
import UsersApi from '../api/UsersApi';
import DevicesApi from '../api/DevicesApi';
import { DeviceStatus, DeviceStatusWithId } from '../models/DeviceStatus';
import Socket from '../api/Socket';
import Network from '../api/Network';
import MessagesApi from '../api/MessagesApi';
import { globalStyles } from '../config/globalStyles';

interface ScreenThingsState {
    isFocused: boolean;
    devices: Array<Device>;
    devicesStatus: Array<DeviceStatusWithId>;
}

export default class ScreenThings extends Component<any, ScreenThingsState> {
    unsubscribe: Unsubscribe;
    state: ScreenThingsState;
    ws: any;
    constructor(props: any) {
        super(props);
        this.state = {
            isFocused: false,
            devices: [],
            devicesStatus: [],
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
                        this.setState({ isFocused: true });
                        console.log("rerendered");
                        UsersApi.getUserDevices((data: Array<Device>) => {
                            let devices = data.map((device) => {
                                return device.id;
                            });

                            let devicesId: string = devices.join(",");
                            DevicesApi.getUserDevicesStatus(devicesId, true, false, (dataStatus: Array<DeviceStatusWithId>) => {
                                self.setState({ devices: data, devicesStatus: dataStatus });
                            })
                        })
                    }
                    break;
                case "DEVICE_STATUS_CHANGE":
                    let stt = state.deviceStt
                    let targetDeviceId = stt.sdid;
                    let data = stt.data;
                    if (targetDeviceId && data) {
                        let update = false;

                        let newState = { ...this.state };
                        let targetDevice = this.state.devicesStatus.find((item) => {
                            return item.did == targetDeviceId;
                        })

                        if (targetDevice != null) {
                            for (var fieldName: string in data) {
                                let newValue = data[`${fieldName}`];
                                targetDevice.data.snapshot[`${fieldName}`].value = newValue;
                            }
                            this.forceUpdate();
                        }
                    }
                    break;
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.ws.close();
    }

    render() {
        let flatListData = this.state.devices.map((device) => {
            device.name = device.name.replace('SmartThings ', '')
            let deviceStatus = this.state.devicesStatus.find((status) => {
                return device.id == status.did
            })

            return {
                info: device,
                status: deviceStatus.data
            }
        });
        return <View style={globalStyles.container}>
            {this.state.isFocused &&
                <FlatList data={flatListData}
                    renderItem={({ item }) => <DeviceListItem {...this.props} device={item} />}
                    keyExtractor={(item) => item.info.id}>
                </FlatList>}
        </View>
    }
}

interface DeviceListItemProps {
    device: any;
    navigation: any;
    screenProps: any;
}

class DeviceListItem extends Component<DeviceListItemProps, any> {
    constructor(props: DeviceListItemProps) {
        super(props);
        this.state = {
            switch: true,
        }
    }

    renderIcon = (device: any) => {
        let info: Device = device.info;
        let status: DeviceStatus = device.status;
        let dtid = info.dtid;

        let styles = deviceListItemStyles;

        switch (dtid) {
            //SmartThings IoTVN VirtualSwitch
            case "dtb86e88a8c3ee47089dfeb17b506a6919":
            case "dtc37b8af5e8064947b94fa5746531ccf7":
                return <Image style={styles.icon} source={require('../image/light.png')} />
            default:
                return <Image style={styles.icon} source={require('../image/default-icon.png')} />
        }
    }

    switch(value, status: DeviceStatus, info: Device) {
        console.log("SWITCHSWITCHSWITCHSWITCHSWITCH")
        switch (info.dtid) {
            //SmartThings IoTVN VirtualSwitch
            case "dtb86e88a8c3ee47089dfeb17b506a6919":
            case "dtc37b8af5e8064947b94fa5746531ccf7":
                {
                    if (value == true) {
                        MessagesApi.sendAction(info.id, "on", {})
                    } else {
                        MessagesApi.sendAction(info.id, "off", {})
                    }
                }
        }
    }

    renderFunction = (device: any) => {
        let info: Device = device.info;
        let status: DeviceStatus = device.status;
        let dtid = info.dtid;

        let styles = deviceListItemStyles;

        switch (dtid) {
            //SmartThings IoTVN VirtualSwitch
            case "dtb86e88a8c3ee47089dfeb17b506a6919":
            case "dtc37b8af5e8064947b94fa5746531ccf7":
                if (status.snapshot != null && status.snapshot != {}) {
                    return <Switch style={styles.switch} value={status.snapshot["switch"].value === "on"} onValueChange={(value) => { this.switch(value, status, info) }} />
                }
                break;
            default:
                //return <Image style={styles.icon} source={require('../image/default-icon.png')} />
                break;
        }
    }

    render() {
        let styles = deviceListItemStyles;
        return <View style={styles.container}>
            <TouchableOpacity onPress={() => { this.props.screenProps.navigate('ActionDetailTab', this.props.device) }}>
                <View style={styles.containerChild}>
                    <View>
                        {this.renderIcon(this.props.device)}
                    </View>
                    <View>
                        <Text style={styles.title}>{this.props.device.info.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View >
                {this.renderFunction(this.props.device)}
                {/* <Switch style={styles.switch} value={this.state.switch} onValueChange={(value) => { this.setState({ switch: !this.state.switch }) }} /> */}
            </View>
        </View>
    }
}

const deviceListItemStyles = StyleSheet.create({
    container: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
    },
    containerChild: {
        display: 'flex',
        alignContent: 'center',
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
    },
    activeTitle: {
        color: 'red',
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 20,
        marginRight: 20,
    },
    switch: {
        marginRight: 20,
    }
});

