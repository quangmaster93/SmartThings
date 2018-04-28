//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image
} from 'react-native';
import UsersApi from '../api/UsersApi';
import { globalStyles } from '../config/globalStyles';
import { ImageHeader } from '../Components/ImageHeader';

export default class ScreenDashboardHome extends Component<any, any>  {
    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'TCQ',
            headerTitle: <Text style={globalStyles.headerTitle}>TCQ</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader/>,
            headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={require('../image/menu.png')}
                    style={[globalStyles.menuIcon]}
                />
            </TouchableOpacity>,
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('ScreenAddFavorite') }}>
                <Image
                    source={require('../image/3dot-ve.png')}
                    style={[globalStyles.headerRightIcon]}
                />
            </TouchableOpacity>
        }
    };
    componentDidMount() {
        UsersApi.getUserProfile();
    }
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                    <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)"></StatusBar>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
                <Text>screenDashboardHome</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
}
)