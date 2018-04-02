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

interface ScreenRecentlyState {
    logData: Array<Message>;
}

export default class ScreenRecently extends Component<any, ScreenRecentlyState> {
    info: Device;
    state: ScreenRecentlyState;
    constructor(props: any) {
        super(props);
        this.info = this.props.screenProps.state.params.info;
        this.state = {
            logData: []
        }
    }

    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <FlatList
                    data={this.state.logData}
                    renderItem={({ item }) => <LogItem logData={item} />}
                />
            </View>
        );
    }

    componentDidMount() {
        let endDate: number = moment.now();
        let startDate = moment(startDate).subtract(3, 'day').valueOf();
        MessagesApi.getNormalizedMessagesByDevice(this.info.id, startDate, endDate, "desc", 100, (data) => {
            let normalizedMessages: NormalizedMessages = data;
            this.setState({ logData: normalizedMessages.data });
        })
    }
}

interface LogItemProps {
    logData: Message;
}
class LogItem extends Component<LogItemProps, any> {

    render() {
        let _switch = this.props.logData.data.switch;
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
                </View>
            </View>
            <View>
                <Text>{moment(this.props.logData.ts).calendar()}</Text>
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
    },
    sttName: {
        marginTop: 3
    }
})

