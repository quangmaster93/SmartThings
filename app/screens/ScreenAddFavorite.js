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
    SectionList
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';
import { NavigationActions } from 'react-navigation'
import { globalStyles } from '../config/globalStyles';
import { Device } from '../models/Device';
import { DeviceChecker } from '../models/DeviceChecker';
import { Scene } from '../models/Scene';
import { SceneChecker } from '../models/SceneChecker';
import { CheckBox } from 'react-native-elements';
import { Common } from '../config/common';
import { ImageHeader } from '../Components/ImageHeader';
import { FirebaseApp } from '../config/firebaseConfig';


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
        let savedDevices = navigation.state.params.savedDevices;
        let stringDevices = '';
        if (savedDevices) {

            let devices = savedDevices.filter(d => d.isCheck == true).map(d => d.id);
            stringDevices = devices.join(",");
        }

        let savedScenes = navigation.state.params.savedScenes;
        let stringScenes = '';
        if (savedScenes) {

            let scenes = savedScenes.filter(d => d.isCheck == true).map(d => d.id);
            stringScenes = scenes.join(",");
        }

        let userId = AppStorage.getState().userInfo.id;
        let database = FirebaseApp.database();
        let userRef = database.ref("UserFavorite");
        userRef.child(userId).update({ things: stringDevices, scenes: stringScenes });
        navigation.goBack();
    }
    unsubscribe: Unsubscribe;
    userDevices: Array<Device>;
    devicesChecker: Array<DeviceChecker>;
    favoriteThings: string
    userScenes: Array<Scene>;
    scenesChecker: Array<SceneChecker>;
    favoriteScenesString: string
    constructor(props: any) {
        super(props);
        this.state = {
            toggleRerenderFlatList: false
        };
        // this.favoriteThings = (this.props.navigation.state.params && this.props.navigation.state.params.favoriteThings) ? this.props.navigation.state.params.favoriteThings : ""
        this.favoriteThings = "";
        this.devicesChecker = [];
        this.userDevices = AppStorage.getState().userDevices;
        // this.devicesChecker = this.userDevices.map((device) => {
        //     return {
        //         id: device.id,
        //         name: Common.ReplaceDeviceName(device.name),
        //         isCheck: this.favoriteThings.includes(device.id) ? true : false
        //     }
        // });

        this.favoriteScenesString = ""
        this.userScenes = AppStorage.getState().userScenes;
        this.scenesChecker=[]
        // this.scenesChecker = this.userScenes.map((scene) => {
        //     return {
        //         id: scene.id,
        //         name: scene.name,
        //         isCheck: this.favoriteScenesString.includes(scene.id) ? true : false
        //     }
        // })

    }
    getFavorite = () => {
        let userId = AppStorage.getState().userInfo.id;
        let database = FirebaseApp.database();
        let userRef = database.ref("UserFavorite");
        userRef.child(userId).once('value', (snapshot) => {
            if (snapshot.val()) {
                this.favoriteThings = snapshot.val().things ? snapshot.val().things : "";
                this.favoriteScenesString = snapshot.val().scenes ? snapshot.val().scenes : "";
                this.devicesChecker = this.userDevices.map((device) => {
                    return {
                        id: device.id,
                        name: Common.ReplaceDeviceName(device.name),
                        isCheck: this.favoriteThings.includes(device.id) ? true : false
                    }
                });
                this.scenesChecker = this.userScenes.map((scene) => {
                    return {
                        id: scene.id,
                        name: scene.name,
                        isCheck: this.favoriteScenesString.includes(scene.id) ? true : false
                    }
                })
                this.setState({
                    toggleRerenderFlatList: !this.state.toggleRerenderFlatList,
                });
            }
        });
    }
    componentDidMount() {
        this.getFavorite();
    }
    componentWillUnmount() {
        // this.unsubscribe();
    }
    toggle = (item: any, isThing: boolean) => {
        if (isThing) {
            let deviceIndex = this.devicesChecker.indexOf(item);
            this.devicesChecker[deviceIndex].isCheck = !this.devicesChecker[deviceIndex].isCheck;
            this.props.navigation.setParams({
                savedDevices: this.devicesChecker,
                savedScenes: this.scenesChecker,
            });
        }
        else {
            let sceneIndex = this.scenesChecker.indexOf(item);
            this.scenesChecker[sceneIndex].isCheck = !this.scenesChecker[sceneIndex].isCheck;
            this.props.navigation.setParams({
                savedScenes: this.scenesChecker,
                savedDevices: this.devicesChecker,
            });
        }

        this.setState({
            toggleRerenderFlatList: !this.state.toggleRerenderFlatList
        })
    }
    renderCheckboxThings = (item: DeviceChecker) => {
        return <CheckBox
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
            onPress={() => this.toggle(item, true)}
        />
    }

    renderCheckboxScenes = (item: DeviceChecker) => {
        return <CheckBox
            containerStyle={styles.checkboxContainer}
            /* textStyle={[globalStyles.commonText,styles.checkboxText]} */
            /* title={item.name}    */
            title={<View style={styles.titleContainer}>
                <Image style={styles.thingIcon} source={require('../image/good_bye.png')} />
                <Text style={[globalStyles.commonText, styles.checkboxText]}>{item.name}</Text>
            </View>}
            iconRight
            right
            checkedIcon={<Image style={styles.starIcon} source={require('../image/star.png')} />}
            uncheckedIcon={<Image style={styles.starIcon} source={require('../image/no-star.png')} />}
            checked={item.isCheck}
            onPress={() => this.toggle(item, false)}
        />
    }

    render() {
        return <View style={[globalStyles.container, styles.container]}>
            <View style={styles.favoriteContainer}>
                {/* <Text style={[globalStyles.commonText,styles.label]}>Things</Text>
                <FlatList style={styles.thingsList} data={this.devicesChecker}
                    renderItem={({ item }) => this.renderCheckbox(item)}
                    extraData={this.state.toggleRerenderFlatList}>
                </FlatList>
            </View>
            <View style={styles.favoriteContainer}>
                <Text style={[globalStyles.commonText,styles.label]}>Routines</Text>
                <FlatList style={styles.thingsList} data={this.devicesChecker}
                    renderItem={({ item }) => this.renderCheckbox(item)}
                    extraData={this.state.toggleRerenderFlatList}>
                </FlatList> */}
                <SectionList sections={[
                    { title: 'Things', data: this.devicesChecker, renderItem: ({ item }) => this.renderCheckboxThings(item) },
                    { title: 'Routines', data: this.scenesChecker, renderItem: ({ item }) => this.renderCheckboxScenes(item) },
                ]}
                    renderSectionHeader={({ section: { title } }) => <Text style={[globalStyles.commonText, styles.label]}>{title}</Text>}
                    extraData={this.state.toggleRerenderFlatList} />
            </View>
        </View>
    };
}
const styles = StyleSheet.create({
    container: {
    },
    favoriteContainer: {

    },
    thingsList: {
        margin: 5,
        marginTop: 0
    },
    label: {
        padding: 5,
        paddingLeft: 15,
        backgroundColor: "#f2f2f2",
        fontWeight: 'bold'
    },
    starIcon: {
        width: 25,
        height: 25
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
