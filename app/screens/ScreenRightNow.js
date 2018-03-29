import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { Unsubscribe } from 'redux';
import { AppStorage } from '../redux/AppStorage';
interface ScreenRightNowState {
    isOn: false
}
export default class ScreenRightNow extends Component<any, ScreenRightNowState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isOn: false
        };
    }
    componentDidMount() {
    }

    render() {
        return (
            //use this.props.screenProps.state.params
            <View style={styles.container}>
                <Image
                    source={require('../image/on.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>On</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    image: {

    },
    text: {

    }
}
)
