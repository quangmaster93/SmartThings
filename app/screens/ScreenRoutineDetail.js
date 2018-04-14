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
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Scene } from '../models/Scene';
import { Action } from '../models/Action';
import { Device } from '../models/Device';
import { AppStorage } from '../redux/AppStorage';

interface ScreenRoutineDetailState {
    info: Scene;
}
export class ScreenRoutineDetail extends Component<any, any> {
    state: ScreenRoutineDetailState;
    devices: Array<Device> = [];
    constructor(props: any) {
        super(props);
        let info = props.screenProps.state.params.info;
        if (info) {
            this.state = { info: JSON.parse(JSON.stringify(info)) };
        }
        else {
            this.state = { info: new Scene() };
        }
        this.devices = AppStorage.getState().userDevices;
    }

    changeName = (text: string) => {
        let info: Scene = this.state.info;
        info.name = text;
        this.setState({ info });
    }

    getDevicename = (ddid: string) => {
        let device = this.devices.find((d:Device) => d.id == ddid);
        if(device){
            return device.name.replace("SmartThings ", "");
        }
        return ddid;
    }

    render() {
        let switchOn = this.state.info.actions.filter((ac: Action) => {
            return ac.action == "on";
        })
        let switchOff = this.state.info.actions.filter((ac: Action) => {
            return ac.action == "off";
        })
        return <View>
            <TextInput onChangeText={(text) => this.changeName(text)} value={this.state.info.name}></TextInput>
            <View style={styles.group}>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.group_head}>Switch on devices</Text>
                    <View>
                        <FlatList data={switchOn}
                            renderItem={({ item }) => <Text>{this.getDevicename(item.ddid)}</Text>}
                            keyExtractor={(item) => item.ddid}>
                        </FlatList>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.group}>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.group_head}>Switch on devices</Text>
                    <View>
                        <FlatList data={switchOff}
                            renderItem={({ item }) => <Text>{this.getDevicename(item.ddid)}</Text>}
                            keyExtractor={(item) => item.ddid}>
                        </FlatList>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    group: {
        padding: 10
    },
    group_head: {
        marginBottom: 10,
        fontWeight: 'bold'
    }
});