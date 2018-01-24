
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {AuthenticationStack} from './app/config/routes';
export default class App extends Component<{}, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  render() {
    const Layout = AuthenticationStack(this.state.loggedIn);
    return <Layout />;
  }
}

