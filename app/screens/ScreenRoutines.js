// @flow
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity,
    Button
} from 'react-native';
import { globalStyles } from '../config/globalStyles';
import { Routine } from '../models/Routine';
import MessagesApi from '../api/MessagesApi';
import { Scene } from '../models/Scene';
import UsersApi from '../api/UsersApi';
import { AppStorage } from '../redux/AppStorage';
import { Unsubscribe } from 'redux';
import ScenesApi from '../api/ScenesApi';
import {ImageHeader} from '../Components/ImageHeader';
import { commonStyle } from '../config/globalStyles';
import { ImageSource } from '../config/ImageSource';

interface ScreenRoutinesState {
    scenes?: Array<Scene>;
    isFocused: boolean,
}
export default class ScreenRoutines extends Component<any, ScreenRoutinesState> {

    // static navigationOptions = ({ navigation }: any) => {
    //     return {
    //         title: 'Routine detail',
    //         headerTitle: <Text style={globalStyles.headerTitle}>Routines</Text>,
    //         headerStyle: globalStyles.headerStyle,
    //         headerBackground: <ImageHeader/>,
    //         headerRight: <TouchableOpacity onPress={() => { ScreenRoutines.Done(navigation) }}>
    //             <Text style={styles.doneButton}>Add</Text>
    //         </TouchableOpacity>,
    //     }
    // };

    static Done(navigation: any) {
        let emptyScene: Scene = new Scene();
        emptyScene.actions = [];
        navigation.navigate('RoutineDetail', { info: emptyScene });
    }

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
                    if (focusedRoute == "ScreenRoutines" || focusedRoute == "AutomationStack") {
                        this.props.screenProps.setParams({ screen: "ScreenRoutines" })
                    }
                    else{
                        this.props.screenProps.setParams({ screen: "ScreenSmartApps" })
                    }

                    if (this.state.isFocused == false && AppStorage.getState().focusedRoute == "AutomationStack") {
                        this.setState({ isFocused: true });

                        if (AppStorage.getState().userInfo != null) {
                            UsersApi.getUserScenes((scenes: Array<Scene>) => {
                                this.setState({ scenes: scenes });
                            })
                        }
                        else {

                        }
                    }
                    break;
                case "ADD_NEW_ROUTINE": 
                    this.onPressAdd();
                    break;
            }
        })

    }

    refresh = () => {
        if (AppStorage.getState().userInfo != null) {
            UsersApi.getUserScenes((scenes: Array<Scene>) => {
                this.setState({ scenes: scenes });
            })
        }
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

    onPressAdd = () => {
        let emptyScene: Scene = new Scene();
        emptyScene.actions = [];
        emptyScene.description = "";
        emptyScene.uid = AppStorage.getState().userInfo.id;
        this.props.screenProps.navigate('RoutineDetail', { info: emptyScene,  onDone:  this.onDone });
    }

    render() {
        return (
            <View style={[globalStyles.container, styles.container, {backgroundColor: "#f2f2f2"}]}>
                {this.state.isFocused &&
                    <FlatList data={this.state.scenes}
                        numColumns={3}
                        renderItem={({ item }) => <RoutineItem data={item} press={this.itemPress} pressSetting={this.itemPressSetting} />}
                        keyExtractor={(item: any) => item.id}
                        style={{margin: 20}}
                        columnWrapperStyle={{marginBottom: 10}}>
                    </FlatList>
                }
            </View>
        );
    }

    itemPress = (id: string) => {
        ScenesApi.activeScene(id, () => {

        })
    }

    onDone = () => {
        this.refresh();
    }

    itemPressSetting = (data: Scene) => {
        this.props.screenProps.navigate('RoutineDetail', { info: data, onDone:  this.onDone});
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
        let image = ImageSource[data.description];
        if(image == null) {
            image = ImageSource.default_routine;
        }
        return <View style={{  width: "32%", marginLeft: "0.65%", marginRight: "0.6%", height: width / 4, borderWidth: 0.5, borderColor: '#d6d7da', position: "relative", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff"}}>
            <TouchableOpacity onPress={() => this.props.press(data.id)} style={{justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
                <Image style={[{ width: width / 8, height: width / 8, justifyContent: "center", alignItems: "center", marginBottom: 25 }]} source={image} />
                <View style={{ paddingTop: 20, alignItems: "center", position: "absolute", bottom: 10 }}>
                    <Text style={{textAlign: "center", fontSize: 12}}>{data.name}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.pressSetting(data)} style={[{ position: "absolute", top: 5, right: 5 }]}>
                <Image style={[{ width: 15, height: 15 }]} source={require('../image/setting-o.png')} />
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start"
    },
    doneButton: {
        color: "#ffffff",
        fontSize: 20,
        marginRight: 12,
        marginTop: 6
    }
});


