
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
export default class App extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogged: false
    };
  };

  componentDidMount() {
    this.GetToken();
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
  onNavigationStateChange = (prevState:any, currentState:any, action:any) => {
    if(action.type=="Navigation/NAVIGATE"){
      AppStorage.postEvent("SET_FOCUSED_SCREEN", action.routeName);
    }
  };
  render() {
    const Layout = AuthenticationStack(this.state.isLogged);
    return <Layout onNavigationStateChange={(prevState, currentState, action) => { this.onNavigationStateChange(prevState, currentState, action) }} />;
  }
}

