//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import UsersApi from '../api/UsersApi';
import { globalStyles } from '../config/globalStyles';
import { ImageHeader } from '../Components/ImageHeader';
import { Device } from '../models/Device';
import { Common } from '../config/common';
import { AppStorage } from '../redux/AppStorage';
import {FirebaseApp} from '../config/firebaseConfig';

export default class ScreenDashboardHome extends Component<any, any>  {
    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'TCQ',
            headerTitle: <Text style={globalStyles.headerTitle}>TCQ</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader/>,
            headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={require('../image/menu.png')}
                    style={[globalStyles.menuIcon]}
                />
            </TouchableOpacity>,
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('ScreenAddFavorite'),navigation.state.params.favoriteThings }}>
                <Image
                    source={require('../image/3dot-ve.png')}
                    style={[globalStyles.headerRightIcon]}
                />
            </TouchableOpacity>
        }
    };
    favoriteThings:string;
    userDevices: Array<Device>;
    favoriteDevices:Array<Device>;
    constructor(props: any) {
        super(props);
        this.userDevices = AppStorage.getState().userDevices;
        this.favoriteDevices=[];
        this.favoriteThings="";
        this.state = {
            toggleRerenderFlatList: false
        };
    }
    getFavorite = () => {
        let userId = AppStorage.getState().userInfo.id;
        let database = FirebaseApp.database();
        let userRef = database.ref("UserFavorite");
        userRef.child(userId).on('value', (snapshot) => {
            snapshot.forEach((data) => {
               this.favoriteThings=data.val().things
                })
            this.props.navigation.setParams({
                favoriteThings:this.favoriteThings
            });
            this.favoriteDevices=this.userDevices.filter(device => this.favoriteThings.includes(device.id))
            this.setState({
                toggleRerenderFlatList: !this.state.toggleRerenderFlatList,
            });
        });
    }
    componentDidMount() {
        this.getFavorite();     
    }
    renderFavorite=(item:Device)=>{
        <View tyle={styles.favoriteBlock}>
            <Image style={styles.favoriteIcon} source={require('../image/on.png')} />
            <Text>{Common.ReplaceDeviceName(item.name)}</Text>
        </View>
    }
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)"></StatusBar>
                <View style={styles.favoriteContainer}>
                    <Text style={styles.label}></Text>
                    <FlatList style={styles.favoritesList} data={this.favoriteDevices}
                        renderItem={({ item }) => this.renderFavorite(item)}
                        extraData={this.state.toggleRerenderFlatList}>
                    </FlatList>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#f2f2f2"
    },
    favoriteContainer:{

    },
    label:{

    },
    favoritesList:{

    },
    favoriteBlock:{

    },
    favoriteIcon:{

    }


}
)