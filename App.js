
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
import { Scene } from './app/models/Scene';
import { Unsubscribe } from 'redux';
import ScreenSplash from './app/screens/ScreenSplash'
export default class App extends Component<{}, any> {
  unsubscribe: Unsubscribe;
  constructor(props: any) {
    super(props);
    this.state = {
      select: "unlogged",
      isStarted:false,
    };
  };

  componentDidMount() {
    this.unsubscribe = AppStorage.subscribe((state) => {
      let that=this;
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
              UsersApi.getUserScenes((data: Array<Scene>) => {
                AppStorage.postEvent("SAVE_USER_SCENES", data);
                this.setState({ select: "loaded" });
              })
            });            
          });
          break;
        case "REMOVE_TOKEN":
          this.setState({ select: "unlogged" });
          break;
      }
    });
    this.GetToken();
    setTimeout(() => {this.setState({isStarted: true})}, 2000);
  }
  
  GetToken() {
    try {
      AsyncStorage.getItem('@token:key').then((access_token) => {
        if (access_token !== null) {
          console.log("token got: " + access_token);
          Network.token = access_token;
          AppStorage.postEvent("SAVE_TOKEN", access_token);
          this.setState({ select: "logged" });
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
    const Layout = AuthenticationStack(this.state.select);
    return this.state.isStarted
    ?<Layout onNavigationStateChange={(prevState, currentState, action) => { this.onNavigationStateChange(prevState, currentState, action) }} />
    :<ScreenSplash/>;
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

