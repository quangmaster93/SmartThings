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

export default class ScreenListDevicesToChoose extends Component<any, any> {
    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'Add a Room',
            headerTitle: <Text style={styles.headerTitle}>Choose Device To Your Room</Text>,
            headerStyle: {
                backgroundColor: stackBackgroundColor,
            },
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Text style={styles.doneButton}>Done</Text>
            </TouchableOpacity>
        }
    };
    unsubscribe: Unsubscribe;
    userDevices: Array<Device>
    constructor(props: any) {
        super(props);
        this.state = {
            roomName: ''
        };
        this.userDevices = AppStorage.getState().userDevices;
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return <View style={[globalStyles.container, styles.container]}>
            <FlatList data={this.userDevices}
                renderItem={({item}) => <Text style={styles.deviceNameText}>{item.name}</Text>}>

            </FlatList>
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
    doneButton: {
        color: "#ffffff",
        fontSize: 20,
        marginRight: 12,
        marginTop: 6
    },
    deviceNameText:{

    }
}
)
