import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class ScreenVoice extends Component {
    render() {
        return (
            <View>
                <Text>screenVoice</Text>
                <Image
                        source={require('../image/db-active.png')}
                        style={styles.icon}
                    />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 23,
        height: 19,
    }
});
