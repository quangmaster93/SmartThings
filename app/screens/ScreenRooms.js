//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    FlatList,
    Alert
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';
import { NavigationActions } from 'react-navigation'
import { globalStyles } from '../config/globalStyles';
import { FirebaseApp } from '../config/firebaseConfig';
import { Room } from '../models/Room';
interface ScreenThingsState {
    isFocused: boolean;
    toggleRerenderFlatList: boolean;
}
export default class ScreenRooms extends Component<any, ScreenThingsState> {
    unsubscribe: Unsubscribe;
    rooms: Array<Room>;
    constructor(props: any) {
        super(props);
        this.state = {
            isFocused: false,
            toggleRerenderFlatList: false
        };
        this.rooms = [];
    }
    componentDidMount() {
        this.unsubscribe = AppStorage.subscribe((state) => {
            switch (state.event) {
                case "SET_FOCUSED_SCREEN":
                    if (AppStorage.getState().focusedRoute == "ScreenRooms") {
                        this.props.screenProps.setParams({ screen: "ScreenRooms" })

                        if (this.state.isFocused == false) {
                            this.getRoom();
                            // this.setState({ isFocused: true });
                            console.log("rerendered");
                        }
                    }
            }
        })
    }
    getRoom = () => {
        let userId = AppStorage.getState().userInfo.id;
        let database = FirebaseApp.database();
        let userRef = database.ref("UserRoom");
        userRef.child(userId).on('value', (snapshot) => {
            this.rooms = [];
            snapshot.forEach((data) => {
                let room: Room = {
                    id: data.key,
                    name: data.val().name,
                    devices: data.val().devices
                }
                this.rooms.push(room);
            })
            this.setState({
                toggleRerenderFlatList: !this.state.toggleRerenderFlatList,
                isFocused: true
            });
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    alertDeleteRoom=(item:Room)=>{
        Alert.alert(
            `Xác nhận`,
            `Bạn có muốn xóa ${item.name} không?`,
            [
              {text: 'Hủy', style: 'cancel'},
              {text: 'Xóa', onPress: () => this.deleteRoom(item.id)},
            ],
            { cancelable: true }
          )
    }

    deleteRoom=(id:string)=>{
        let userId = AppStorage.getState().userInfo.id;
        let database = FirebaseApp.database();
        let userRef = database.ref("UserRoom");
        userRef.child(userId).child(id).remove();
    }

    renderName = (item: Room) => {
        return(
        <TouchableOpacity  onPress={() => { this.props.screenProps.navigate('RoomDetailTab', item)}}
        onLongPress={()=>{this.alertDeleteRoom(item)}}>
            <View style={styles.roomBlock}>
                <Image style={styles.roomImage} source={require('../image/room.png')} />
                <Text style={styles.name}>{item.name}</Text>
            </View>
            
        </TouchableOpacity>
        )
    }

    render() {
        return <View style={[globalStyles.container, styles.container]}>
            {this.state.isFocused &&
                <View>
                    <View style={styles.listRoom}>
                        <FlatList data={this.rooms}
                            renderItem={({ item }) => this.renderName(item)}
                            extraData={this.state.toggleRerenderFlatList}>
                        </FlatList>
                    </View>
                    {/* <TouchableOpacity style={styles.addthing} onPress={() => { this.props.screenProps.navigate('ScreenAddRoom') }}>
                        <Image
                            source={require('../image/add-icon.png')}
                            style={styles.addIcon}
                        />
                        <Text style={styles.addText}>Add a Room</Text>
                    </TouchableOpacity> */}
                </View>

            }
        </View>
    };
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:"#f2f2f2",
        paddingTop:10,
        paddingBottom:10,
        paddingRight:15,
        paddingLeft:15,
    },
    // addthing: {
    //     marginTop: 10,
    //     // flex: 1,
    //     flexDirection: 'row',
    //     marginLeft: 10,
    // },
    // addIcon: {
    //     width: 20,
    //     height: 20
    // },
    addText: {
        marginLeft: 10
    },
    listRoom: {
        // flex: 1,
    },
    roomBlock:{
        backgroundColor:"#ffffff",
        marginTop:5,
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:20
    },
    roomImage:{
        width:43,
        height:43
    },
    name: {
        // borderBottomWidth: 1,
        // borderBottomColor: '#d6d7da',
        padding: 20,
        fontSize: 16,
        marginLeft:10
    }

}
)
