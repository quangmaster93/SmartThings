//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';
import { NavigationActions } from 'react-navigation'
import { globalStyles } from '../config/globalStyles';
interface ScreenAddRoomState{
    roomName:string
}
export default class ScreenAddRoom extends Component<any, ScreenAddRoomState> {
    static navigationOptions = ({navigation}:any)=>{
        return{
            title: 'Add a Room',
            headerTitle:<Text style={styles.headerTitle}>Add a Room</Text>,
            headerStyle: {
                backgroundColor: stackBackgroundColor,
            },
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
        }       
      };
    unsubscribe: Unsubscribe;
    constructor(props: any) {
        super(props);
        this.state = {
            roomName:''
        };
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return <View style={[globalStyles.container, styles.container]}>
            <View style={styles.name}>
                <Text>Room Name</Text>
                <TextInput placeholder="e.g. Living room" value={this.state.roomName} 
                onChangeText={(roomName) => this.setState({roomName})}></TextInput>
            </View>
        </View>
    };
}
const stackBackgroundColor='#00be82'
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
    name:{

    }
}
)
