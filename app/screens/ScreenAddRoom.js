//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';
import { NavigationActions } from 'react-navigation'
import { globalStyles } from '../config/globalStyles';
import { Device } from '../models/Device';
import { DeviceChecker } from '../models/DeviceChecker';
import {FirebaseApp} from '../config/firebaseConfig'
interface ScreenAddRoomState {
    roomName: string,
    toggleRerenderFlatList:boolean
}
export default class ScreenAddRoom extends Component<any, ScreenAddRoomState> {
    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'Add a Room',
            headerTitle: <Text style={styles.headerTitle}>Add a Room</Text>,
            headerStyle: {
                backgroundColor: stackBackgroundColor,
            },
            headerRight: <TouchableOpacity onPress={() => { ScreenAddRoom.SaveRoom(navigation) }}>
                <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
        }
    };
    unsubscribe: Unsubscribe;
    savedDevices: Array<DeviceChecker>;
    constructor(props: any) {
        super(props);
        this.state = {
            roomName: '',
            toggleRerenderFlatList: false
        };
        this.savedDevices=[];
    }
    onDone = (devices: Array<DeviceChecker>) => {
        this.savedDevices=devices;
        this.props.navigation.setParams({
            savedDevices:devices
        });
        this.setState({
            toggleRerenderFlatList: !this.state.toggleRerenderFlatList
        })
    }
    static SaveRoom=(navigation:any)=>{
        let roomName=navigation.state.params.roomName;
        if(roomName!=''){
            let savedDevices=navigation.state.params.savedDevices;
            let userId=AppStorage.getState().userInfo.id;
            let database=FirebaseApp.database();
            let userRef=database.ref("UserRoom");
            let userIdRef=userRef.child(userId);
        }
    }
    EditName=(roomName:string)=>{
        this.props.navigation.setParams({
            roomName
        });
        this.setState({ roomName })
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        // this.unsubscribe();
    }
    render() {
        return <View style={[globalStyles.container, styles.container]}>
            <View style={styles.name}>
                <Text>Room Name</Text>
                <TextInput placeholder="e.g. Living room" value={this.state.roomName}
                    onChangeText={(roomName) =>this.EditName(roomName)}></TextInput>
            </View>
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('ScreenListDevicesToChoose',
                    {
                        onDone: (devices) => this.onDone(devices)
                    })
            }}>
                <View style={styles.chooseDevicesContainer}>
                    <Text style={styles.chooseDevicesText}>Choose devices</Text>
                    <View style={styles.listDevices}>
                        <FlatList data={this.savedDevices}
                            renderItem={({ item }) => <Text>{item.name}</Text>}
                            extraData={this.state.toggleRerenderFlatList}>
                        </FlatList>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    };
}
const stackBackgroundColor = '#00be82'
const styles = StyleSheet.create({
    container: {

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
        marginTop: 6
    },
    name: {

    },
    chooseDevicesContainer: {

    },
    chooseDevicesText: {

    },
    listDevices: {

    },
    deviceNameText: {

    }
}
)
