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
import {FirebaseApp} from '../config/firebaseConfig';
import {ImageHeader} from '../Components/ImageHeader';
interface ScreenAddRoomState {
    roomName: string,
    toggleRerenderFlatList:boolean
}
export default class ScreenAddRoom extends Component<any, ScreenAddRoomState> {
    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'Add a Room',
            headerTitle: <Text style={globalStyles.headerTitle}>Add a Room</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader/>,
            headerRight: <TouchableOpacity onPress={() => { ScreenAddRoom.SaveRoom(navigation) }}>
                <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
        }
    };
    unsubscribe: Unsubscribe;
    savedDevices: Array<DeviceChecker>;
    devicesChecker:Array<DeviceChecker>
    constructor(props: any) {
        super(props);
        this.state = {
            roomName: '',
            toggleRerenderFlatList: false
        };
        this.savedDevices=[];
        this.devicesChecker=[];
    }
    onDone = (devices: Array<DeviceChecker>) => {
        this.savedDevices=devices.filter(d=>d.isCheck==true);
        this.devicesChecker=devices;
        this.props.navigation.setParams({
            savedDevices:this.savedDevices
        });
        this.setState({
            toggleRerenderFlatList: !this.state.toggleRerenderFlatList
        })
    }
    static SaveRoom=(navigation:any)=>{
        let roomName='';
        if(navigation.state.params&&navigation.state.params.roomName){
            roomName=navigation.state.params.roomName;
        }
        if(roomName!=''){
            let savedDevices=navigation.state.params.savedDevices;
            let stringDevices='';
            if(savedDevices){
                let devices=savedDevices.map(d=>d.id);
                stringDevices=devices.join(",");               
            }
            let userId=AppStorage.getState().userInfo.id;
            let database=FirebaseApp.database();
            let userRef=database.ref("UserRoom");
            userRef.child(userId).push().set({name:roomName,devices:stringDevices});
            navigation.goBack();           
        }
        else{
            ScreenAddRoom.alertFillOut()
        }
    }

    static alertFillOut=()=>{
        Alert.alert(
            `Thông báo`,
            `Hãy nhập tên của phòng`,
            [
              {text: 'Ok', style: 'cancel'},
            ],
            { cancelable: true }
          )
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
    navigateToScreenChooseDevices=()=>{
        let temp= JSON.parse(JSON.stringify(this.devicesChecker));
        this.props.navigation.navigate('ScreenListDevicesToChoose',
        {
            onDone: (devices) => this.onDone(devices),
            devicesChecker:temp
        })
    }
    render() {
        return <View style={[globalStyles.container, styles.container]}>
            <View style={styles.name}>
                <Text style={[globalStyles.commonText,styles.labelInput]}>Room Name</Text>
                <TextInput style={[globalStyles.commonText,styles.inputName]} placeholder="e.g. Living room" value={this.state.roomName}
                    onChangeText={(roomName) =>this.EditName(roomName)}></TextInput>
            </View>
            <TouchableOpacity onPress={() => {
                this.navigateToScreenChooseDevices()
            }}>
                <View style={styles.chooseDevicesContainer}>
                    <Text style={[globalStyles.commonText,styles.chooseDevicesText]}>Choose devices</Text>
                    <View style={styles.listDevices}>
                        <FlatList data={this.savedDevices}
                            renderItem={({ item }) => <Text style={[globalStyles.commonText,styles.deviceName]}>{item.name}</Text>}
                            extraData={this.state.toggleRerenderFlatList}>
                        </FlatList>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    };
}
const styles = StyleSheet.create({
    container: {
        padding:15,
    },
    saveButton: {
        color: "#ffffff",
        fontSize: 19,
        marginRight: 12,
        // marginTop: 6
    },
    name: {

    },
    chooseDevicesContainer: {

    },
    chooseDevicesText: {

    },
    listDevices: {
        marginLeft:5
    },
    deviceNameText: {

    },
    labelInput:{

    },
    inputName:{
        color:'red'
    },
    deviceName:{
        color:'green'
    }
}
)
