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
    TextInput,
    ScrollView,
    Alert
} from 'react-native';
import { Scene } from '../models/Scene';
import { Action } from '../models/Action';
import { Device } from '../models/Device';
import { AppStorage } from '../redux/AppStorage';
import { DeviceChecker } from '../models/DeviceChecker';
import ScenesApi from '../api/ScenesApi';
import { ImageHeader } from '../Components/ImageHeader';
import { globalStyles } from '../config/globalStyles';

interface ScreenRoutineDetailState {
    info: Scene;
}
export class ScreenRoutineDetail extends Component<any, any> {
    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'Routine detail',
            headerTitle: <Text style={globalStyles.headerTitle}>Choose Device</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader />,
            headerRight: <TouchableOpacity onPress={() => { ScreenRoutineDetail.Save(navigation) }}>
                <Text style={styles.doneButton}>Save</Text>
            </TouchableOpacity>
        }
    };
    state: ScreenRoutineDetailState;
    devices: Array<Device> = [];
    constructor(props: any) {
        super(props);
        let info = props.navigation.state.params.info;
        if (info) {
            this.state = { info: JSON.parse(JSON.stringify(info)) };
        }
        else {
            this.state = { info: new Scene() };
        }
        this.devices = AppStorage.getState().userDevices;
        this.props.navigation.setParams({
            savedRoutine: info,
        });
    }

    static Save(navigation: any) {
        let routine: Scene = navigation.state.params.savedRoutine;
        if (routine.id) {
            ScenesApi.updateScene(routine, () => {
                navigation.state.params.onDone()
                navigation.goBack();
            })
        }
        else if (routine.name) {
            ScenesApi.createScene(routine, () => {
                navigation.state.params.onDone()
                navigation.goBack();
            })
        }

    }

    changeName = (text: string) => {
        let self = this;
        let info: Scene = this.state.info;
        info.name = text;
        this.setState({ info }, () => {
            self.props.navigation.setParams({
                savedRoutine: self.state.info,
            });
        });
    }

    getDevicename = (ddid: string) => {
        let device = this.devices.find((d: Device) => d.id == ddid);
        if (device) {
            return device.name.replace("SmartThings ", "");
        }
        return ddid;
    }

    onDone = (action: string, devicesChecked: Array<DeviceChecker>) => {
        devicesChecked = devicesChecked.filter(d => d.isCheck)
        let currentActions = this.state.info.actions;
        switch (action) {
            case "on": {
                currentActions = currentActions.filter((d) => {
                    // iff device action is "on" and is checked form `devicesChecked`=> keep in list
                    if (d.action == "on") {
                        devicesChecked.forEach((i) => {
                            if (i.id == d.ddid) {
                                return true
                            }
                        })
                        return false;
                    }
                    return true;
                });

                devicesChecked.forEach((d) => {
                    let isInActions = currentActions.find(i => i.ddid == d.id && i.action == "on") != null;
                    if (!isInActions) {
                        let newAction = new Action();
                        newAction.action = "on";
                        newAction.ddid = d.id;
                        currentActions.push(newAction);
                    }
                })
            }
                break;
            case "off": {
                currentActions = currentActions.filter((d) => {
                    // iff device action is "off" and is checked form `devicesChecked`=> keep in list
                    if (d.action == "off") {
                        devicesChecked.forEach((i) => {
                            if (i.id == d.ddid) {
                                return true
                            }
                        })
                        return false;
                    }
                    return true;
                });

                devicesChecked.forEach((d) => {
                    let isInActions = currentActions.find(i => i.ddid == d.id && i.action == "off") != null;
                    if (!isInActions) {
                        let newAction = new Action();
                        newAction.action = "off";
                        newAction.ddid = d.id;
                        currentActions.push(newAction);
                    }
                })
            }
                break;
        }
        let info = this.state.info;
        info.actions = currentActions;
        this.props.navigation.setParams({
            savedRoutine: info,
        });
        this.setState({ info });
    }

    isCheckedIn(deviceId: string, devices: Array<DeviceChecker>) {
        let device = devices.find(d => d.id == deviceId)
        return device != null;
    }

    getListCheck = (target: string, ignore: string) => {
        let actions = this.state.info.actions;
        let switchOffCheck: Array<DeviceChecker> = this.devices.map(d => {
            let isCheck = !!actions.find(a => a.ddid == d.id && a.action == target)
            let checker = new DeviceChecker();
            checker.id = d.id;
            checker.name = d.name
            checker.isCheck = isCheck;
            return checker;
        })
        switchOffCheck = switchOffCheck.filter((d) => {
            let isIgnore = !!actions.find(a => a.ddid == d.id && a.action == ignore);
            return !isIgnore;
        })

        return switchOffCheck;
    }

    choseIconDone = (image: string) => {
        let self = this;
        let info: Scene = this.state.info;
        info.description = image;
        this.setState({ info }, () => {
            self.props.navigation.setParams({
                savedRoutine: self.state.info,
            });
        });
    }

    alertDeleteRoutine = (routine: Scene) => {
        let self = this;
        Alert.alert(
            'Delete routine',
            'Are you sure you want to delete this routine?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => self.deleteRoutine(routine)},
            ],
            { cancelable: true }
          )
    }

    deleteRoutine = (routine: Scene) => {
        let self = this;
        ScenesApi.deleteScene(routine, () => {
            self.props.navigation.state.params.onDone();
            self.props.navigation.goBack();
        })
    }

    render() {
        let switchOn = this.state.info.actions.filter((ac: Action) => {
            return ac.action == "on";
        })
        let switchOff = this.state.info.actions.filter((ac: Action) => {
            return ac.action == "off";
        })
        let switchOnCheck: Array<DeviceChecker> = this.getListCheck("on", "off");
        let switchOffCheck: Array<DeviceChecker> = this.getListCheck("off", "on");
        return <View style={{paddingLeft: 10, paddingRight: 10}}>
            <TextInput placeholder="Routine name" onChangeText={(text) => this.changeName(text)} value={this.state.info.name}></TextInput>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ScreenChoseIcon', 
            {onDone: this.choseIconDone, icons: "default_routine,back,good_bye,good_morning,good_night", selected: this.state.info.description})}}>
                <Text>Chose Icon</Text>
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.group}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('ScreenListDevicesToChoose',
                            { onDone: (devices) => this.onDone("on", devices), devicesChecker: switchOnCheck || [] })
                    }}>
                        <Text style={styles.group_head}>Switch on devices</Text>
                        {switchOn.length ?
                            <View>
                                <FlatList data={switchOn}
                                    renderItem={({ item }) => <Text>{this.getDevicename(item.ddid)}</Text>}
                                    keyExtractor={(item) => item.ddid}>
                                </FlatList>
                            </View>
                            :
                            <Text style={null}>Touch to add devices</Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.group}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('ScreenListDevicesToChoose',
                            { onDone: (devices) => this.onDone("off", devices), devicesChecker: switchOffCheck || [] })
                    }}>
                        <Text style={styles.group_head}>Switch off devices</Text>
                        <View>
                            <FlatList data={switchOff}
                                renderItem={({ item }) => <Text>{this.getDevicename(item.ddid)}</Text>}
                                keyExtractor={(item) => item.ddid}>
                            </FlatList>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={() => this.alertDeleteRoutine(this.state.info)}>
                <Text style={{color: "red"}}>Remove this routine</Text>
            </TouchableOpacity>
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
    },
    doneButton: {
        color: "#ffffff",
        fontSize: 20,
        marginRight: 12,
        marginTop: 6
    }
});