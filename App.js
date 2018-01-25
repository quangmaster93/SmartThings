
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
          console.log("token got: "+ access_token);
          Network.token = access_token;
          this.setState({ isLogged: true});
        } else {

        }
      });
    } catch (error) {
      console.log("cannot get token");
    }
  }
  render() {
    console.log("App");
    console.log(this.props);
    const Layout = AuthenticationStack(this.state.isLogged);
    return <Layout />;
  }
}

