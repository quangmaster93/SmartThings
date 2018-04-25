//@flow
import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';

export const ImageHeader = () => (
    <Image 
      resizeMode="contain"
      style={styles.headerBg}
      source={require('../image/header-bg.png')}
    />
);


const styles = StyleSheet.create({ 
  headerBg:{
      flex:1,
      resizeMode:"contain",
      width:null,
      height:null
  }
});