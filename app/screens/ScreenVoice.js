import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { globalStyles } from '../config/globalStyles';
export default class ScreenVoice extends Component {
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
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
    container:{

    },
    icon: {
        width: 23,
        height: 19,
    },
});
