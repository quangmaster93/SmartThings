//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions
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
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('ScreenAddFavorite',{favoriteThings:navigation.state.params.favoriteThings})}}>
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
        this.props.navigation.setParams({
            favoriteThings:this.favoriteThings
        });
        this.state = {
            toggleRerenderFlatList: false
        };
    }
    getFavorite = () => {
        let userId = AppStorage.getState().userInfo.id;
        let database = FirebaseApp.database();
        let userRef = database.ref("UserFavorite");
        userRef.child(userId).on('value', (snapshot) => {
            if(snapshot.val()){
                this.favoriteThings=snapshot.val().things
                this.props.navigation.setParams({
                    favoriteThings:this.favoriteThings
                });
                this.favoriteDevices=this.userDevices.filter(device => this.favoriteThings.includes(device.id))
                this.setState({
                    toggleRerenderFlatList: !this.state.toggleRerenderFlatList,
                });
            }            
        });
    }
    componentDidMount() {
        this.getFavorite();     
    }
    renderFavorite=(item:Device)=>{
        return <View style={styles.favoriteBlock}>
            <Image style={styles.favoriteIcon} source={require('../image/on.png')} />
            <Text style={[globalStyles.commonText,styles.favoriteName]}>{Common.ReplaceDeviceName(item.name)}</Text>
        </View>
    }
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)"></StatusBar>
                <View style={styles.favoriteContainer}>
                    <Text style={styles.label}>Favorites</Text>
                    <FlatList contentContainerStyle={styles.favoritesList} data={this.favoriteDevices}
                        renderItem={({ item }) => this.renderFavorite(item)}
                        extraData={this.state.toggleRerenderFlatList}
                        numColumns={3}
                        horizontal={false}
                        >
                        
                    </FlatList>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#f2f2f2",
        padding:10,
        flex:1,
    },
    favoriteContainer:{
        padding:10,
        backgroundColor:"#ffffff",
        borderRadius: 7,
        paddingBottom:20
    },
    label:{
        fontWeight:"bold",
        fontSize:19,
        margin:5
    },
    favoritesList:{
        // flex:1,
    },
    favoriteBlock:{
        width:(Dimensions.get("window").width - 40)/3,
        height:(Dimensions.get("window").width - 40)/3,
        flexDirection:"column",
        // paddingRight:25,
        // paddingLeft:25,
        // paddingTop:7,
        // paddingBottom:7,
        alignItems:"center",
        padding:7,
        paddingTop:0,
        paddingBottom:0,
        // backgroundColor:"green"
    },
    favoriteIcon:{
        width:"70%",
        resizeMode:"contain"
    },
    favoriteName:{
        textAlign:"center",
        // backgroundColor:"red",
        marginTop:-10
    }


}
)