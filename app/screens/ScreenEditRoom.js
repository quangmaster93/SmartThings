//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    FlatList,
    Alert
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';
import { NavigationActions } from 'react-navigation'
import { globalStyles } from '../config/globalStyles';
import { Device } from '../models/Device';
import { DeviceChecker } from '../models/DeviceChecker';
import { FirebaseApp } from '../config/firebaseConfig';
import { Common } from '../config/common';

interface ScreenEditRoomState {
    roomName: string,
    toggleRerenderFlatList: boolean,
    roomDevices: Array<Device>,
    stringDevices: string
}

export default class ScreenEditRoom extends Component<any, ScreenEditRoomState> {
    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'Edit Room',
            headerTitle: <Text style={styles.headerTitle}>Edit Room</Text>,
            headerStyle: {
                backgroundColor: stackBackgroundColor,
            },
            headerRight: <TouchableOpacity onPress={() => { ScreenEditRoom.Done(navigation) }}>
                <Text style={styles.saveButton}>Done</Text>
            </TouchableOpacity>
        }
    };
    userDevices: Array<Device>;
    devicesChecker: Array<DeviceChecker>;
    savedDevices: Array<DeviceChecker>;
    constructor(props: any) {
        super(props);
        this.userDevices = AppStorage.getState().userDevices;
        let roomDevices: Array<Device> = this.userDevices.filter(device => this.props.navigation.state.params.devices.includes(device.id));
        this.state = {
            roomName: this.props.navigation.state.params.name,
            toggleRerenderFlatList: false,
            roomDevices: roomDevices,
            stringDevices: this.props.navigation.state.params.devices
        };
        this.devicesChecker = this.userDevices.map((device) => {
            return {
                id: device.id,
                name: Common.ReplaceDeviceName(device.name),
                isCheck: this.props.navigation.state.params.devices.includes(device.id) ? true : false
            }
        });
        this.savedDevices = [];

    }
    static Done = (navigation: any) => {
        let stringDevices=navigation.state.params.stringDevices!=undefined?navigation.state.params.stringDevices:navigation.state.params.devices;
        let roomName=navigation.state.params.roomName!=undefined?navigation.state.params.roomName:navigation.state.params.name;
        let id=navigation.state.params.id;
        let userId=AppStorage.getState().userInfo.id;
        let database=FirebaseApp.database();
        let userRef=database.ref("UserRoom");
        userRef.child(userId).child(id).update({name:roomName,devices:stringDevices});
        navigation.state.params.goBackToScreenRoom();
    }
    componentDidMount() {
        let a = this.props.navigation
    }
    componentWillUnmount() {
        // this.unsubscribe();
    }

    EditName = (roomName: string) => {
        this.props.navigation.setParams({
            roomName
        });
        this.setState({ roomName })
    }
    DeleteDevice = (id: string) => {
        let roomDevices = this.state.roomDevices.filter(d => d.id !== id);
        let stringDevices = "";
        if(roomDevices){
            let devices = roomDevices.map(d => d.id);
            stringDevices = devices.join(",");
        }       
        this.props.navigation.setParams({
            stringDevices: stringDevices
        });
        this.devicesChecker=this.userDevices.map((device)=>{
            return {
                id:device.id,
                name: Common.ReplaceDeviceName(device.name),
                isCheck:stringDevices.includes(device.id)?true:false
            }
        });
        this.setState({
            stringDevices: stringDevices,
            roomDevices: roomDevices,
            toggleRerenderFlatList: !this.state.toggleRerenderFlatList
        })
    }
    renderDevice = (device: Device) => {
        return (
            <View style={styles.deviceBlock}>
                <Text style={styles.deviceName}>{Common.ReplaceDeviceName(device.name)}</Text>
                <TouchableOpacity onPress={() => { this.DeleteDevice(device.id) }}>
                    <Text style={styles.del}>Del</Text>
                </TouchableOpacity>
            </View>
        );
    }
    onDone = (devices: Array<DeviceChecker>) => {
        this.savedDevices = devices.filter(d => d.isCheck == true);
        this.devicesChecker = devices;
        let stringDevices = "";
        if (this.savedDevices) {
            let devices = this.savedDevices.map(d => d.id);
            stringDevices = devices.join(",");
        }
        this.props.navigation.setParams({
            stringDevices: stringDevices
        });
        let roomDevices: Array<Device> = this.userDevices.filter(device => stringDevices.includes(device.id));
        this.setState({
            stringDevices: stringDevices,
            roomDevices: roomDevices,
            toggleRerenderFlatList: !this.state.toggleRerenderFlatList
        })
    }
    navigateToScreenChooseDevices = () => {
        let temp = JSON.parse(JSON.stringify(this.devicesChecker));
        this.props.navigation.navigate('ScreenListDevicesToChoose',
            {
                onDone: (devices) => this.onDone(devices),
                devicesChecker: temp
            })
    }
    removeRoom = () => {

    }
    alertDeleteRoom = () => {
        // let a={...this.props.navigation.state.params,age:}
        Alert.alert(
            `Xác nhận`,
            `Bạn có muốn xóa ${this.props.navigation.state.params.name} không?`,
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', onPress: () => this.deleteRoom() },
            ],
            { cancelable: true }
        )
    }

    deleteRoom = () => {
        let id: string = this.props.navigation.state.params.id;
        let userId = AppStorage.getState().userInfo.id;
        let database = FirebaseApp.database();
        let userRef = database.ref("UserRoom");
        userRef.child(userId).child(id).remove();
        this.props.navigation.state.params.goBackToScreenRoom();
    }
    render() {
        return <View style={[globalStyles.container, styles.container]}>
            <View style={styles.name}>
                <Text>Room Name</Text>
                <TextInput style={styles.inputName} value={this.state.roomName}
                    onChangeText={(roomName) => this.EditName(roomName)}></TextInput>
            </View>
            <View>
                <Text>Devices in this room</Text>
                <FlatList style={styles.listDevices} data={this.state.roomDevices}
                    renderItem={({ item }) => this.renderDevice(item)}
                    extraData={this.state.toggleRerenderFlatList}>
                </FlatList>
            </View>

            <TouchableOpacity onPress={() => { this.navigateToScreenChooseDevices() }}>
                <Text style={styles.addDevices}>Add devices to room</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.alertDeleteRoom() }}>
                <Text style={styles.removeRoom}>Remove this room</Text>
            </TouchableOpacity>
        </View>
    };
}
const stackBackgroundColor = '#00be82'
const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    headerTitle: {
        color: "#ffffff",
        fontSize: 20,
        marginLeft: 12,
        marginTop: 6
    },
    saveButton: {
        color: "#ffffff",
        fontSize: 20,
        marginRight: 12,
        // marginTop: 6
    },
    name: {

    },
    inputName: {
        color: 'red'
    },
    listDevices: {
        // flex: 1,
        padding: 10
    },
    deviceBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    deviceName: {

    },
    del: {
        color: "red"
    },
    addDevices: {

    },
    removeRoom: {

    }
}
)
