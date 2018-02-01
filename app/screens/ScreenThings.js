//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Switch,
    DeviceEventEmitter
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

interface ScreenThingsState {
    isFocused: boolean;
    devices: Array<Device>;
    devicesStatus: Array<DeviceStatusWithId>;
}

export default class ScreenThings extends Component<any, ScreenThingsState> {
    unsubscribe: Unsubscribe;
    state: ScreenThingsState;
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
                                self.tracking(devicesId);
                                self.setState({ devices: data, devicesStatus: dataStatus });
                            })
                        })
                    }
            }
        })
    }

    tracking = (devicesId: string) => {
        let self = this;
        let ws = Socket.LiveByDevices(devicesId);
        ws.onmessage = (e) => {
            // a message was received
            let responseDate = JSON.parse(e.data);

            let targetDeviceId = responseDate.sdid;
            let data = responseDate.data;
            if (targetDeviceId && data) {
                let update = false;

                let newState = { ...this.state };
                let targetDevice = this.state.devicesStatus.find((item) => {
                    return item.did == targetDeviceId;
                })

                if (targetDevice != null) {
                    for (fieldName in data) {
                        let newValue = data[`${fieldName}`];
                        targetDevice.data.snapshot[`${fieldName}`].value = newValue;
                    }
                    this.forceUpdate();
                }
            }

        };

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let flatListData = this.state.devices.map((device) => {
            let deviceStatus = this.state.devicesStatus.find((status) => {
                return device.id == status.did
            })

            return {
                info: device,
                status: deviceStatus.data
            }
        })
        return <View>
            <FlatList data={flatListData}
                renderItem={({ item }) => <DeviceListItem device={item} />}
                keyExtractor={(item) => item.info.id}>
            </FlatList>
        </View>
    }
}

interface DeviceListItemProps {
    device: any;
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
            case "dt88a5b9bda4704cb5b101967067fd5897":
                return <Image style={styles.icon} source={require('../image/light.png')} />
            default:
                return <Image style={styles.icon} source={require('../image/default-icon.png')} />
        }
    }

    renderFunction = (device: any) => {
        let info: Device = device.info;
        let status: DeviceStatus = device.status;
        let dtid = info.dtid;

        let styles = deviceListItemStyles;

        switch (dtid) {
            case "dt88a5b9bda4704cb5b101967067fd5897":
                if (status.snapshot != null && status.snapshot != {}) {
                    return <Switch style={styles.switch} value={status.snapshot["switch"].value === "on"} onValueChange={(value) => { }} />
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
            <View style={styles.containerChild}>
                <View>
                    {this.renderIcon(this.props.device)}
                </View>

                <View>
                    <Text style={styles.title}>{this.props.device.info.name}</Text>
                </View>
            </View>
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

