import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';
import { globalStyles } from '../config/globalStyles';
import moment from "moment"
import MessagesApi from '../api/MessagesApi';
import { Device } from '../models/Device';
import { NormalizedMessages } from '../models/NormalizedMessages';
import { Message } from '../models/Message';
import { AppStorage } from '../redux/AppStorage';
import { Unsubscribe } from 'firebase';

class DeviceMessage {
    device: Device;
    message: Message;
}

export default class ScreenRecentlyAll extends Component<any, any> {
    unsubscribe: Unsubscribe;
    state: ScreenRecentlyAllState;
    devicesString: string = "";
    deviceMessages: Array<DeviceMessage> = []
    constructor(props: any) {
        super(props);
        this.state = {
            logData: []
        }
        this.devicesString = props.screenProps.state.params != null ? props.screenProps.state.params.devices : "";
    }

    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <FlatList
                    data={this.deviceMessages}
                    renderItem={({ item }) => <LogItem logData={item} />}
                />
            </View>
        );
    }

    componentDidMount() {
        let self = this;
        let endDate: number = moment.now();
        let startDate = moment(startDate).subtract(3, 'day').valueOf();
        let devicesStringArray = this.devicesString.split(",");
        let prms: Array<Promise> = [];

        devicesStringArray.forEach((item, index) => {
            let device = AppStorage.getState().userDevices.find(d => d.id == item);
            if(!device) {
                return;
            }
            let prm = MessagesApi.getNormalizedMessagesByDevice(device.id, startDate, endDate, "desc", 100, (data) => {
                let normalizedMessages: NormalizedMessages = data;
                let messages = normalizedMessages.data;
                messages.forEach((m, i) => {
                    let dm: DeviceMessage = {
                        device: device,
                        message: m
                    }
                    self.deviceMessages.push(dm)
                })
            });

            prms.push(prm);

        })
        
        Promise.all(prms).then(() => {
            self.deviceMessages.sort((a, b) => {
                return b.message.ts - a.message.ts;
            })

            self.forceUpdate();
        })
    }
    componentWillUnmount() {
        // this.unsubscribe();
    }
}

interface LogItemProps {
    logData: DeviceMessage;
}
class LogItem extends Component<LogItemProps, any> {

    render() {
        let _switch = this.props.logData.message.data.switch;
        return <View style={styles.logItem}>
            <View style={styles.logItemLeft}>
                <View>
                    {(_switch == 'on') && <Image style={styles.icon} source={require('../image/light-on.png')} />}
                    {(_switch == 'off') && <Image style={styles.icon} source={require('../image/light-off.png')} />}
                </View>
                <View>
                    <Text style={styles.sttName}>
                        {(_switch == 'on') && "Turn on"}
                        {(_switch == 'off') && "Turn off"}
                    </Text>
                    <Text>{this.props.logData.device.name}</Text>
                </View>
            </View>
            <View>
                <Text>{moment(this.props.logData.message.ts).calendar()}</Text>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
    },
    logItem: {
        display: 'flex',
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    logItemLeft: {
        display: 'flex',
        alignContent: 'center',
        flexDirection: 'row',
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 15,
        marginTop: 3
    },
    sttName: {
        marginTop: 0
    }
})

