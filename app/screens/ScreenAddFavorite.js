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
import { ImageHeader } from '../Components/ImageHeader';
import {FirebaseApp} from '../config/firebaseConfig';


export default class ScreenAddFavorite extends Component<any, any> {
    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'Add a Room',
            headerTitle: <Text style={globalStyles.headerTitle}>Manage Favorite</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader />,
            headerRight: <TouchableOpacity onPress={() => { ScreenAddFavorite.Done(navigation) }}>
                <Text style={styles.doneButton}>Done</Text>
            </TouchableOpacity>
        }
    };
    static Done = (navigation: any) => {
        let savedDevices=navigation.state.params.savedDevices;
        let stringDevices='';
        if(savedDevices){

            let devices=savedDevices.filter(d=>d.isCheck==true).map(d=>d.id);
            stringDevices=devices.join(",");               
        }
        let userId=AppStorage.getState().userInfo.id;
        let database=FirebaseApp.database();
        let userRef=database.ref("UserFavorite");
        userRef.child(userId).update({things:stringDevices});
        navigation.goBack();       
    }
    unsubscribe: Unsubscribe;
    userDevices: Array<Device>;
    devicesChecker: Array<DeviceChecker>;
    favoriteThings:string
    constructor(props: any) {
        super(props);
        this.state = {
            toggleRerenderFlatList: false
        };
        this.favoriteThings=(this.props.navigation.state.params && this.props.navigation.state.params.favoriteThings) ?this.props.navigation.state.params.favoriteThings:""
        this.userDevices = AppStorage.getState().userDevices;
        this.devicesChecker = this.userDevices.map((device) => {
            return {
                id: device.id,
                name: Common.ReplaceDeviceName(device.name),
                isCheck: this.favoriteThings.includes(device.id)?true:false
            }
        })
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        // this.unsubscribe();
    }
    toggle = (device: DeviceChecker) => {
        let deviceIndex = this.devicesChecker.indexOf(device);
        this.devicesChecker[deviceIndex].isCheck = !this.devicesChecker[deviceIndex].isCheck;
        this.props.navigation.setParams({
            savedDevices: this.devicesChecker,
        });
        this.setState({
            toggleRerenderFlatList: !this.state.toggleRerenderFlatList
        })
    }
    renderCheckbox = (item: DeviceChecker) =>
        <CheckBox
            containerStyle={styles.checkboxContainer}
            /* textStyle={[globalStyles.commonText,styles.checkboxText]} */
            /* title={item.name}    */
            title={<View style={styles.titleContainer}>
                <Image style={styles.thingIcon} source={require('../image/light.png')} />
                <Text style={[globalStyles.commonText, styles.checkboxText]}>{item.name}</Text>
            </View>}
            iconRight
            right
            checkedIcon={<Image style={styles.starIcon} source={require('../image/star.png')} />}
            uncheckedIcon={<Image style={styles.starIcon} source={require('../image/no-star.png')} />}
            checked={item.isCheck}
            onPress={() => this.toggle(item)}
        />

    render() {
        return <View style={[globalStyles.container, styles.container]}>
            <View style={styles.thingsContainer}>
                <Text style={[globalStyles.commonText,styles.label]}>Things</Text>
                <FlatList style={styles.thingsList} data={this.devicesChecker}
                    renderItem={({ item }) => this.renderCheckbox(item)}
                    extraData={this.state.toggleRerenderFlatList}>
                </FlatList>
            </View>
        </View>
    };
}
const styles = StyleSheet.create({
    container: {
    },
    thingsContainer:{

    },
    thingsList:{
        margin:5,
        marginTop:0
    },
    label:{
        padding:5,
        paddingLeft:15,
        backgroundColor:"#f2f2f2",
        fontWeight:'bold'
    },
    starIcon:{
        width:25,
        height:25
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
        paddingTop: 5,
        paddingBottom: 5,
        margin: 0,
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        // flexDirection: 'row',
        // justifyContent:'space-between',

    },
    checkboxText: {
        fontWeight: "normal",
    },
    titleContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: "center"
    },
    thingIcon: {
        width: 30,
        height: 30,
        marginRight: 10
    }
}
)
