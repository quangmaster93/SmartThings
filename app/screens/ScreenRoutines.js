// @flow
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import { globalStyles } from '../config/globalStyles';
import { Routine } from '../models/Routine';
import MessagesApi from '../api/MessagesApi';
import { Scene } from '../models/Scene';
import UsersApi from '../api/UsersApi';
import { AppStorage } from '../redux/AppStorage';
import { Unsubscribe } from 'redux';
import ScenesApi from '../api/ScenesApi';

interface ScreenRoutinesState {
    scenes?: Array<Scene>;
    isFocused: boolean,
}
export default class ScreenRoutines extends Component<any, ScreenRoutinesState> {
    unsubscribe: Unsubscribe;
    state: ScreenRoutinesState = {
        scenes: [],
        isFocused: false
    }

    componentDidMount() {
        this.unsubscribe = AppStorage.subscribe((state) => {
            switch (state.event) {
                case "SET_FOCUSED_SCREEN":
                    let focusedRoute = AppStorage.getState().focusedRoute;
                    if (focusedRoute == "ScreenRoutines") {
                        this.props.screenProps.setParams({ screen: "ScreenRoutines" })
                    }

                    if (this.state.isFocused == false && AppStorage.getState().focusedRoute == "AutomationStack") {
                        this.setState({ isFocused: true });
                        console.log("rerendered");

                        if (AppStorage.getState().userInfo != null) {
                            UsersApi.getUserScenes((scenes: Array<Scene>) => {
                                this.setState({ scenes: scenes });
                            })
                        }
                        else {

                        }
                    }
                    break;
            }
        })

    }
    data: Array<Routine> = [
        {
            id: "1",
            name: "Turn on all light",
            icon: "icon-light-on",
            tasks: [
                {
                    type: "SWITCH_ON",
                    dids: [
                        // "5476630a35bb4d0899c904198985c7ad",
                        // "839291e781a649669bc5e0dbeac825a9",
                        "0567b03339154385a80e7336827eb15b",
                        "07e24732c26e4e259531d58b970a73dc"
                    ]
                }, {
                    type: "SWITCH_OFF",
                    dids: []
                }
            ]
        }, {
            id: "2",
            name: "Turn off all light",
            icon: "icon-light-off",
            tasks: [
                {
                    type: "SWITCH_ON",
                    dids: []
                }, {
                    type: "SWITCH_OFF",
                    dids: [
                        // "5476630a35bb4d0899c904198985c7ad",
                        // "839291e781a649669bc5e0dbeac825a9",
                        "0567b03339154385a80e7336827eb15b",
                        "07e24732c26e4e259531d58b970a73dc"
                    ]
                }
            ]
        }, {
            id: "3",
            name: "dv2",
            icon: "../image/light.png",
            tasks: []
        }, {
            id: "4",
            name: "dv2",
            icon: "../image/light.png",
            tasks: []
        }, {
            id: "5",
            name: "dv2",
            icon: "../image/light.png",
            tasks: []
        }, {
            id: "6",
            name: "dv2",
            icon: "../image/light.png",
            tasks: []
        }
    ];
    render() {
        return (
            // <View style={[globalStyles.container, styles.container]}>
            //     <FlatList data={this.data}
            //         numColumns={2}
            //         renderItem={({ item }) => <RoutineItem data={item} press={this.itemPress} pressSetting={this.itemPressSetting} />}
            //         keyExtractor={(item: any) => item.id}>
            //     </FlatList>
            // </View>
            <View style={[globalStyles.container, styles.container]}>
                {this.state.isFocused &&
                    <FlatList data={this.state.scenes}
                        numColumns={2}
                        renderItem={({ item }) => <RoutineItem data={item} press={this.itemPress} pressSetting={this.itemPressSetting} />}
                        keyExtractor={(item: any) => item.id}>
                    </FlatList>
                }
            </View>
        );
    }

    itemPress = (id: string) => {
        ScenesApi.activeScene(id, () => {
            
        })
        // let self = this;
        // var selectedRoutine = this.data.find((item) => item.id == id)
        // if (selectedRoutine !== undefined) {
        //     selectedRoutine.tasks.forEach((item, index, tasks) => {
        //         switch (item.type) {
        //             case "SWITCH_ON": {
        //                 self.switchOnDevices(item.dids)
        //             }
        //                 break;
        //             case "SWITCH_OFF": {
        //                 self.switchOffDevices(item.dids)
        //             }
        //                 break;
        //         }
        //     });
        // }
    }

    itemPressSetting = (data: Scene) => {
        this.props.screenProps.navigate('ScreenRoutineDetail', data);
    }

    switchOnDevices = (dids: Array<string>) => {
        dids.forEach((ddid) => {
            MessagesApi.sendAction(ddid, "on")
        })
    }

    switchOffDevices = (dids: Array<string>) => {
        dids.forEach((ddid) => {
            MessagesApi.sendAction(ddid, "off")
        })
    }
}
interface RoutineItemProps {
    data: Routine;
    press: Function;
    pressSetting: Function;
}
class RoutineItem extends Component<RoutineItemProps, any> {
    constructor(props: RoutineItemProps) {
        super(props)
    }

    render() {
        let { height, width } = Dimensions.get('window');
        // let data: Routine = this.props.data;
        let data: Scene = this.props.data;
        let icon;
        switch (data.icon) {
            case "icon-light-on":
                icon = require("../image/light-on.png");
                break;
            case "icon-light-off":
                icon = require("../image/light-off.png");
                break;
            default:
                icon = require("../image/3dot-ve.png");
                break;
        }
        return <View style={{ flex: 1, height: width / 2, borderWidth: 0.5, borderColor: '#d6d7da', position: "relative", justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.props.press(data.id)}>
                <Image style={[{ width: width / 4, height: width / 4 }]} source={icon} />
                <View style={{ paddingTop: 20, alignItems: "center" }}>
                    <Text>{data.name}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.pressSetting(data)} style={[{ position: "absolute", top: 5, right: 5 }]}>
                <Image style={[{ width: 20, height: 20 }]} source={require('../image/setting-o.png')} />
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
    },
});

