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
import { CheckBox } from 'react-native-elements';
import { Common } from '../config/common';


export default class ScreenListDevicesToChoose extends Component<any, any> {
    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'Add a Room',
            headerTitle: <Text style={styles.headerTitle}>Choose Device To Your Room</Text>,
            headerStyle: {
                backgroundColor: stackBackgroundColor,
            },
            headerRight: <TouchableOpacity onPress={() => {  ScreenListDevicesToChoose.Done(navigation) }}>
                <Text style={styles.doneButton}>Done</Text>
            </TouchableOpacity>
        }
    };
    static Done=(navigation:any)=>{
        navigation.state.params.onDone(navigation.state.params.savedDevices)
        navigation.goBack();
    }
    unsubscribe: Unsubscribe;
    userDevices: Array<Device>;
    devicesChecker:Array<DeviceChecker>;
    constructor(props: any) {
        super(props);
        this.state = {
            toggleRerenderFlatList: false
        };
        this.userDevices = AppStorage.getState().userDevices;
        this.devicesChecker=this.userDevices.map((device)=>{
            return {
                id:device.id,
                name: Common.ReplaceDeviceName(device.name),
                isCheck:false
            }
        })
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
        // this.unsubscribe();
    }
    toggle=(device:DeviceChecker)=>{
        let deviceIndex =this.devicesChecker.indexOf(device);
        this.devicesChecker[deviceIndex].isCheck=!this.devicesChecker[deviceIndex].isCheck;
        let savedDevices=this.devicesChecker.filter(d=>d.isCheck==true);
        this.props.navigation.setParams({
            savedDevices: savedDevices,
          });
        this.setState({
            toggleRerenderFlatList: !this.state.toggleRerenderFlatList
        })
    }
    renderCheckbox=(item:DeviceChecker)=>
        <CheckBox
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        title={item.name}   
        iconRight
        checkedIcon={<Image source={require('../image/check.png')} />}
        uncheckedIcon={<Image source={require('../image/uncheck.png')} />}
        checked={item.isCheck}
        onPress={() => this.toggle(item)}
    />
    
    render() {
        return <View style={[globalStyles.container, styles.container]}>
            <FlatList data={this.devicesChecker}
                renderItem={({ item }) => this.renderCheckbox(item)}
                extraData={this.state.toggleRerenderFlatList}>
            </FlatList>
           
        </View>
    };
}
const stackBackgroundColor = '#00be82'
const styles = StyleSheet.create({
    container: {    
        paddingTop:5
    },
    headerTitle: {
        color: "#ffffff",
        fontSize: 20,
        marginLeft: 12,
        marginTop: 6
    },
    doneButton: {
        color: "#ffffff",
        fontSize: 20,
        marginRight: 12,
        marginTop: 6
    },
    deviceNameText: {

    },
    checkboxContainer: {
        paddingTop:4,
        paddingBottom:4,
        margin:0,
        backgroundColor:'transparent',
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        // flex: 1, 
        // flexDirection: 'row',
        justifyContent:'space-between',
    },
    checkboxText:{
        // backgroundColor:'red',
        // flex: 0.9
    }
}
)
