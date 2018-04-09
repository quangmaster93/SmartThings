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
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
        }
    };
    unsubscribe: Unsubscribe;
    // userDevices: Array<Device>
    savedDevices: Array<DeviceChecker>
    constructor(props: any) {
        super(props);
        this.state = {
            roomName: '',
            toggleRerenderFlatList: false
        };
        // this.userDevices = AppStorage.getState().userDevices;
        this.devicesChecker=null;
    }
    onDone = (devices: Array<DeviceChecker>) => {
        this.savedDevices=devices;
        this.setState({
            toggleRerenderFlatList: !this.state.toggleRerenderFlatList
        })
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
                    onChangeText={(roomName) => this.setState({ roomName })}></TextInput>
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
