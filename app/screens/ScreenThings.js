//@flow
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
import type { AppEvent } from '../redux/AppEvent';
import { AppState } from '../redux/AppState';

export default class ScreenThings extends Component<any,any> {
    unsubscribe: Unsubscribe
    constructor(props:any) {
        super(props);
        this.state={isFocused:false};
    }
    componentDidMount() {
        this.unsubscribe = AppStorage.subscribe((state) => {
            switch (state.event) {
              case "SET_FOCUSED_SCREEN":
                if(this.state.isFocused==false && AppStorage.getState().focusedRoute=="MyhomeStack"){
                    this.setState({isFocused:true });
                    console.log("rerendered");
                }              
                break;
            }
          })
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return <View>
                {this.state.isFocused && <Text>screenThings</Text>}
            </View>      
    }
}

