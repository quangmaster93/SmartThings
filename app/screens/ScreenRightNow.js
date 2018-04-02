//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import { manifests } from '../config/manifest';
import { Device } from '../models/Device';
import UsersApi from '../api/UsersApi';
import DevicesApi from '../api/DevicesApi';
import { DeviceStatus, DeviceStatusWithId } from '../models/DeviceStatus';
import Socket from '../api/Socket';
import Network from '../api/Network';
import MessagesApi from '../api/MessagesApi';
import { globalStyles } from '../config/globalStyles';
interface ScreenRightNowState {

}
export default class ScreenRightNow extends Component<any, ScreenRightNowState> {
    info: Device;
    status: DeviceStatus;
    constructor(props: any) {
        super(props);
        this.state = {

        };
        this.status = this.props.screenProps.state.params.status;
        this.info = this.props.screenProps.state.params.info;
    }
    componentDidMount() {
        this.tracking(this.info.id);
    }
    switch() {
        var changeTo = this.status.snapshot['switch'].value === 'on' ? 'off' : 'on'
        var that = this;
        MessagesApi.sendAction(this.info.id, changeTo, {}, "action", (res) => {
            if (res.ok === true) {
                that.status.snapshot['switch'].value = changeTo;
                that.forceUpdate();
            }
        })
    }
    tracking = (deviceId: string) => {
        let self = this;
        let ws = Socket.LiveByDevices(deviceId);
        // let ws = Socket.CommonWS;
        ws.onmessage = (e: any) => {
            // a message was received
            let responseDate = JSON.parse(e.data);
            console.log(responseDate);
            if (responseDate.sdid == deviceId) {
                let data = responseDate.data;
                if (data) {
                    for (var fieldName: string in data) {
                        let newValue = data[`${fieldName}`];
                        this.status.snapshot[`${fieldName}`].value = newValue;
                    }
                    this.forceUpdate();
                }
            }

        };
    }
    renderComponent = () => {
        switch (this.info.dtid) {
            case "dtc37b8af5e8064947b94fa5746531ccf7":
                return <TouchableOpacity style={styles.button} onPress={() => { this.switch() }}>
                    <Image
                        source={this.status.snapshot["switch"].value === "on" ? require('../image/light-on.png') : require('../image/light-off.png')}
                        style={styles.image}
                    />
                    {/* <Text style={styles.text}>{this.status.snapshot["switch"].value === "on" ? 'On' : 'Off'}</Text> */}
                </TouchableOpacity>
        }
    }

    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                {this.renderComponent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
    },
    text: {

    },
    button: {

    }
}
)
