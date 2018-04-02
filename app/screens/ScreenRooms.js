//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';
import { NavigationActions } from 'react-navigation'
import { globalStyles } from '../config/globalStyles';
interface ScreenThingsState {
    isFocused: boolean;
}
export default class ScreenRooms extends Component<any, ScreenThingsState> {
    unsubscribe: Unsubscribe;
    constructor(props: any) {
        super(props);
        this.state = {
            isFocused: false,
            devices: []
        };
    }
    componentDidMount() {
        this.unsubscribe = AppStorage.subscribe((state) => {
            switch (state.event) {
                case "SET_FOCUSED_SCREEN":
                    if (AppStorage.getState().focusedRoute == "ScreenRooms") {
                        this.props.screenProps.setParams({ screen: "ScreenRooms" })
                        if (this.state.isFocused == false) {
                            this.setState({ isFocused: true });
                            console.log("rerendered");
                        }
                    }
            }
        })
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return <View style={[globalStyles.container, styles.container]}>
            {this.state.isFocused &&
                <TouchableOpacity style={styles.addthing} onPress={() => { }}>
                    <Image
                        source={require('../image/add-icon.png')}
                        style={styles.addIcon}
                    />
                    <Text style={styles.addText}>Add a Thing</Text>
                </TouchableOpacity>
            }
        </View>
    };
}
const styles = StyleSheet.create({
    container: {

    },
    addthing: {
        marginTop:10,
        flex: 1, 
        flexDirection: 'row',
        marginLeft:10,
    },
    addIcon: {
        width:20,
        height:20
    },
    addText: {
        marginLeft:10
    }

}
)
