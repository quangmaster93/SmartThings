// @flow
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    FlatList,
    Dimensions
} from 'react-native';
import { ImageHeader } from '../Components/ImageHeader';
import { globalStyles } from '../config/globalStyles';
import { ImageSource } from '../config/ImageSource';

interface ScreenChoseIconProps {
    images: string;
}
export default class ScreenChoseIcon extends Component<any, any> {
    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'Add a Room',
            headerTitle: <Text style={globalStyles.headerTitle}>Choose Device</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader />,
            headerRight: <TouchableOpacity onPress={() => { ScreenChoseIcon.Done(navigation) }}>
                <Text style={styles.doneButton}>Done</Text>
            </TouchableOpacity>
        }
    };
    static Done = (navigation: any) => {
        navigation.state.params.onDone(navigation.state.params.selected)
        navigation.goBack();
    }

    icons: Array<string>
    iconsString: string
    constructor(props: any) {
        super(props);
        let iconsString: string = this.props.navigation.state.params.icons;
        this.icons = iconsString.split(",");
        this.iconsString = iconsString;
        let selected = this.props.navigation.state.params.selected;
        if (!selected || !iconsString.includes(selected)) {
            selected = "default_routine"
        }
        this.state = {
            selected: selected
        }
    }

    render() {
        return <View>
            <Text>{this.state.selected}</Text>
            <FlatList data={this.icons}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item: string) => item}
                numColumns={3}
                style={{ margin: 10 }}
                columnWrapperStyle={{ marginBottom: 10 }}>
            </FlatList>
        </View>
    }

    renderItem = (filename: string) => {
        let { height, width } = Dimensions.get('window');
        return <View style={{ width: "32%", marginLeft: "0.65%", marginRight: "0.6%", height: width / 4, borderWidth: 0.5, borderColor: '#d6d7da', position: "relative", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
            {this.state.selected == filename ?
                <View style={[{ position: "absolute", top: 5, right: 5 }]}>
                    <Image style={[{ width: 15, height: 15 }]} source={require('../image/check.png')} />
                </View>
                : null
            }
            <TouchableOpacity onPress={() => this.selectIcon(filename)} style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                <Image style={[{ width: width / 6, height: width / 6, justifyContent: "center", alignItems: "center" }]} source={ImageSource[filename]} />
            </TouchableOpacity>
        </View>
    }

    selectIcon = (filename: string) => {
        this.props.navigation.setParams({
            selected: filename,
        });
        this.setState({ selected: filename })
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5
    },
    doneButton: {
        color: "#ffffff",
        fontSize: 20,
        marginRight: 12,
        marginTop: 6
    }
});
