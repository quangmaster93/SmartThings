//@flow
import React, { Component } from 'react';
import {
    Button,
    View,
    Text,
    Linking,
    AsyncStorage,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';
import Network from '../api/Network';
import { AppStorage } from '../redux/AppStorage';


export default class ScreenLogin extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    LogIn = () => {
        let that = this;
        let challenge = "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"
        let client_id = "0c2cefcfe2f245f58e053c31fa2241cb";
        let redirect_uri = "cloud.artik.example.hellocloud://oauth2callback";
        let state = "abcdefgh";
        let url = `https://accounts.artik.cloud/authorize?prompt=login&client_id=${client_id}&response_type=code&code_challenge=${challenge}&code_challenge_method=S256&redirect_uri=${redirect_uri}&state=${state}`
        Linking.openURL(url)
        Linking.addEventListener('url', (event) => {
            var code = event.url.split("code=")[1].split('&')[0];
            let dkm = {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: "cloud.artik.example.hellocloud://oauth2callback",
                state: "abcdefgh",
                code_verifier: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
                client_id: "0c2cefcfe2f245f58e053c31fa2241cb"
            };
            let urlGetToken = `https://accounts.artik.cloud/token?grant_type=${dkm.grant_type}&code=${dkm.code}&redirect_uri=${dkm.redirect_uri}&state=${dkm.state}&code_verifier=${dkm.code_verifier}&client_id=${dkm.client_id}`;
            fetch(urlGetToken, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(responseJson => {
                    let access_token = JSON.parse(responseJson._bodyInit).access_token;
                    that.SaveToken(access_token);
                    console.log(access_token);
                    Network.token = access_token;
                    AppStorage.postEvent("SAVE_TOKEN", access_token);
                    that.props.navigation.navigate('RootApp')
                })
                .catch(error => {
                    console.error("Loi: " + error);
                });
        });
    }
    SaveToken(access_token: any) {
        try {
            console.log("SaveToken");
            AsyncStorage.setItem('@token:key', access_token).then(() => {
                console.log("token is saved!");
            });

        } catch (error) {
            console.log("token is not saved!")
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.bg} source={require('../image/bg1.png')}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require('../image/logo.png')}>
                        </Image>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => { this.LogIn() }} style={styles.loginButton}>
                            <Text style={styles.loginText}>
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                        {/* <View style={styles.loginButton}>
                            <Button onPress={() => { this.LogIn() }} title="Login" />
                        </View> */}
                    </View>

                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    bg: {
        flex: 1,
        flexDirection: 'column'
    },
    logoContainer: {
        flex: 0.13,
        flexDirection: 'column',
        paddingTop: 12
    },
    logo: {
        flex: 1,
        resizeMode: "contain",

    },
    buttonContainer: {
        flex: 0.9,
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
        paddingTop:30
    },
    loginButton: {
        flex: 0.75,
        height: 45,
        backgroundColor: '#a939b2',
        justifyContent: "center",
        alignItems: "center",
        borderRadius:25
    },
    loginText:{
        color:"#ffffff",
        fontSize:17
    }
})
