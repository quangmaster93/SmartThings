// @flow
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Image
} from 'react-native';
import { globalStyles } from '../config/globalStyles';
import { Routine } from '../models/Routine';

export default class ScreenRoutines extends Component<any, any> {
    componentDidMount() {
    }
    data: Array<Routine> = [
        {
            id: "1",
            name: "dv1",
            icon: "../image/light.png",
        }, {
            id: "2",
            name: "dv2",
            icon: "../image/light.png",
        }, {
            id: "3",
            name: "dv2",
            icon: "../image/light.png",
        }, {
            id: "4",
            name: "dv2",
            icon: "../image/light.png",
        }, {
            id: "5",
            name: "dv2",
            icon: "../image/light.png",
        }, {
            id: "6",
            name: "dv2",
            icon: "../image/light.png",
        }
    ];
    render() {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <FlatList data={this.data}
                    numColumns={2}
                    renderItem={({ item }) => <RoutineItem data={item} />}
                    keyExtractor={(item: any) => item.id}>
                </FlatList>
            </View>
        );
    }
}
interface RoutineItemProps {
    data: Routine;
}
class RoutineItem extends Component<RoutineItemProps, any> {
    constructor(props: RoutineItemProps) {
        super(props)
    }

    render() {
        let { height, width } = Dimensions.get('window');
        let data: Routine = this.props.data;
        return <View style={{ flex: 1, height: width / 2, borderWidth: 0.5, borderColor: '#d6d7da', position: "relative", justifyContent: "center", alignItems: "center" }}>
            <Image style={[{ width: width / 4, height: width / 4 }]} source={require("../image/light.png")} />
            <View style={{ paddingTop: 20 }}>
                <Text>{data.name}</Text>
            </View>
            <Image style={[{ width: 20, height: 20, position: "absolute", top: 5, right: 5 }]} source={require('../image/setting.png')} />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
    },
});

