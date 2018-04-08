
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import Network from './app/api/Network';
import { AuthenticationStack } from './app/config/routes';
import { AppStorage } from './app/redux/AppStorage';
import UsersApi from './app/api/UsersApi';
import Socket from './app/api/Socket';
import { Device } from './app/models/Device';
import { Unsubscribe } from 'redux';
export default class App extends Component<{}, any> {
  unsubscribe: Unsubscribe;
  constructor(props: any) {
    super(props);
    this.state = {
      isLogged: false
    };
  };

  componentDidMount() {
    this.GetToken();

    this.unsubscribe = AppStorage.subscribe((state) => {
      switch (state.event) {
        case "SAVE_TOKEN":
          UsersApi.getUserProfile(data => {
            UsersApi.getUserDevices((data: Array<Device>) => {
              AppStorage.postEvent("SAVE_USER_DEVICES", data);
              let devices = data.map((device) => {
                return device.id;
              });

              let devicesId: string = devices.join(",");
              Socket.OpenCommonWS(devicesId);
            })
          });
      }
    });
  }
  
  GetToken() {
    try {
      AsyncStorage.getItem('@token:key').then((access_token) => {
        if (access_token !== null) {
          console.log("token got: " + access_token);
          Network.token = access_token;
          AppStorage.postEvent("SAVE_TOKEN", access_token);
          this.setState({ isLogged: true });
        } else {

        }
      });
    } catch (error) {
      console.log("cannot get token");
    }
  }
  onNavigationStateChange = (prevState: any, currentState: any, action: any) => {
    if (action.type == "Navigation/NAVIGATE") {
      AppStorage.postEvent("SET_FOCUSED_SCREEN", action.routeName);
    }
  };
  render() {
    const Layout = AuthenticationStack(this.state.isLogged);
    return <Layout onNavigationStateChange={(prevState, currentState, action) => { this.onNavigationStateChange(prevState, currentState, action) }} />;
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

