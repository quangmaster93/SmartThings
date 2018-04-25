//@flow
import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator  } from 'react-navigation';
import ScreenSlideMenu from '../screens/ScreenSlideMenu';
import ScreenMyAccount from '../screens/ScreenMyAccount';
import ScreenLogin from '../screens/ScreenLogin';
import ScreenSupport from '../screens/ScreenSupport';
import ScreenDashboardHome from '../screens/ScreenDashboardHome';
import ScreenActionDetail from '../screens/ScreenActionDetail';
import ScreenThings from '../screens/ScreenThings';
import ScreenRooms from '../screens/ScreenRooms';
import ScreenRoutines from '../screens/ScreenRoutines';
import ScreenSmartApps from '../screens/ScreenSmartApps';
import ScreenVoice from '../screens/ScreenVoice';
import ScreenRecently from '../screens/ScreenRecently';
import ScreenRightNow from '../screens/ScreenRightNow';
import ScreenAddRoom from '../screens/ScreenAddRoom';
import ScreenEditRoom from '../screens/ScreenEditRoom';
import ScreenListDevicesToChoose from '../screens/ScreenListDevicesToChoose';
import { globalStyles } from '../config/globalStyles';


import {
    Image,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';
import { AppStorage } from '../redux/AppStorage';
import { ScreenRoutineDetail } from '../screens/ScreenRoutineDetail';
import ScreenRecentlyAll from '../screens/ScreenRecentlyAll';
import {ImageHeader} from '../Components/ImageHeader';


//DashboardStack
export const DashboardStack = StackNavigator({
    ScreenDashboardHome: {
        screen: ScreenDashboardHome,
        navigationOptions: ({ navigation }) => ({
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
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={require('../image/3dot-ve.png')}
                    style={[globalStyles.headerRightIcon]}
                />
            </TouchableOpacity>

        })
    }
    // ScreenActionDetail: screenActionDetail
},
    {
        navigationOptions: {

        }
    }
);

//MyhomeTab
export const MyhomeTab = TabNavigator(
    {
        ScreenThings: {
            screen: ScreenThings,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.labelTop]}>Things</Text>
            }
        },
        ScreenRooms: {
            screen: ScreenRooms,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.labelTop]}>Rooms</Text>
            }
        }
    },
    {
        tabBarPosition: 'top',
        scrollEnabled: true,
        swipeEnabled: true,
        initialRouteName: 'ScreenThings',
        lazyLoad: true,
        tabBarOptions: {
            labelStyle: {
            },
            style: {
                backgroundColor: '#f5f8ff',
                height: 43,
            },
            showIcon: false,
            tabStyle: {
            },
            indicatorStyle: globalStyles.underLineTabStyle
        }
    }
);

//ActionDetailTab
const ActionDetailTab = TabNavigator(
    {
        ScreenRightNow: {
            screen: ScreenRightNow,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.labelTop]}>Right Now</Text>
            }
        },
        ScreenRecently: {
            screen: ScreenRecently,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.labelTop]}>Recently</Text>
            }
        }
    },
    {
        tabBarPosition: 'top',
        scrollEnabled: true,
        swipeEnabled: true,
        initialRouteName: 'ScreenRightNow',
        lazyLoad: true,
        tabBarOptions: {
            labelStyle: {
            },
            style: {
                backgroundColor: '#f5f8ff',
                height: 43,

            },
            showIcon: false,
            tabStyle: {
            },
            indicatorStyle: globalStyles.underLineTabStyle
        }
    }
);

//RoomDetailTab
const RoomDetailTab = TabNavigator(
    {
        ScreenRightNow: {
            screen: ScreenThings,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.labelTop]}>Right Now</Text>
            }
        },
        ScreenRecently: {
            screen: ScreenRecentlyAll,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.labelTop]}>Recently</Text>
            }
        }
    },
    {
        tabBarPosition: 'top',
        scrollEnabled: true,
        swipeEnabled: true,
        initialRouteName: 'ScreenRightNow',
        lazyLoad: true,
        tabBarOptions: {
            labelStyle: {
            },
            style: {
                backgroundColor: '#f5f8ff',
                height: 43,

            },
            showIcon: false,
            tabStyle: {
            },
            indicatorStyle: globalStyles.underLineTabStyle
        }
    }
);



//MyhomeStack
export const MyhomeStack = StackNavigator({
    MyhomeTab: {
        screen: ({ navigation }) => <MyhomeTab screenProps={navigation} onNavigationStateChange={(prevState: any, currentState: any, action: any) => {
            AppStorage.postEvent("SET_FOCUSED_SCREEN", action.routeName);
        }} />,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={globalStyles.headerTitle}>My home</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader/>,
            headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={require('../image/menu.png')}
                    style={[globalStyles.menuIcon]}
                />
            </TouchableOpacity>,
            headerRight: navigation.state.params?(navigation.state.params.screen == "ScreenRooms" ?  
            <TouchableOpacity onPress={() => { navigation.navigate('ScreenAddRoom') }}>
                <Image
                    source={require('../image/add.png')}
                    style={[globalStyles.addIcon]}
                />
            </TouchableOpacity>
            :null):null
        })
    }

});


//AutomationTab
export const AutomationTab = TabNavigator(
    {
        ScreenRoutines: {
            screen: ({ navigation }) => <ScreenRoutines screenProps={navigation} />,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.labelTop]}>Routines</Text>
            }
        },
        ScreenSmartApps: {
            screen: ScreenSmartApps,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.labelTop]}>SmartApps</Text>
            }
        }
    },
    {
        tabBarPosition: 'top',
        scrollEnabled: true,
        swipeEnabled: true,
        initialRouteName: 'ScreenRoutines',
        lazyLoad: true,
        tabBarOptions: {
            labelStyle: {
            },
            style: {
                backgroundColor: '#f5f8ff',
                height: 43,

            },
            showIcon: false,
            tabStyle: {
            },
            indicatorStyle: globalStyles.underLineTabStyle
        }
    }
);

//AutomationStack
export const AutomationStack = StackNavigator({
    AutomationTab: {
        screen: AutomationTab,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={globalStyles.headerTitle}>Automation</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader/>,
            headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={require('../image/menu.png')}
                    style={[globalStyles.menuIcon]}
                />
            </TouchableOpacity>
        })
    }
});

//VoiceStack
export const VoiceStack = StackNavigator({
    ScreenVoice: {
        screen: ScreenVoice,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={globalStyles.headerTitle}>Speech</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader/>,
            headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={require('../image/menu.png')}
                    style={[globalStyles.menuIcon]}
                />
            </TouchableOpacity>
        })
    }
});

//Tab
export const RootTab = TabNavigator(
    {
        DashboardStack: {
            screen: DashboardStack,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.label]}>Dashboard</Text>,
                tabBarIcon: ({ focused, tintColor }) => (
                    focused ? <Image
                        source={require('../image/db.png')}
                        style={[styles.icon, { tintColor: tintColor }]}
                    />
                        :
                        <Image
                            source={require('../image/db-active.png')}
                            style={[styles.icon, { tintColor: tintColor }]}
                        />
                )
            }
        },
        MyhomeStack: {
            screen: MyhomeStack,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.label]}>My home</Text>,
                tabBarIcon: ({ focused, tintColor }) => (
                    focused ? <Image
                        source={require('../image/myhome.png')}
                        style={[styles.icon, { tintColor: tintColor }]}
                    />
                        :
                        <Image
                            source={require('../image/myhome-active.png')}
                            style={[styles.icon, { tintColor: tintColor }]}
                        />
                )
            }
        },
        AutomationStack: {
            screen: AutomationStack,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.label]}>Automation</Text>,
                tabBarIcon: ({ focused, tintColor }) => (
                    focused ? <Image
                        source={require('../image/automation.png')}
                        style={[styles.icon, { tintColor: tintColor }]}
                    />
                        :
                        <Image
                            source={require('../image/automation-active.png')}
                            style={[styles.icon, { tintColor: tintColor }]}
                        />
                )
            }
        },
        VoiceStack: {
            screen: VoiceStack,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : unfocusedUnderTabColor }, styles.label]}>Speech</Text>,
                tabBarIcon: ({ focused, tintColor }) => (
                    focused ? <Image
                        source={require('../image/speech.png')}
                        style={[styles.iconSpeech, { tintColor: tintColor }]}
                    />
                        :
                        <Image
                            source={require('../image/speech-active.png')}
                            style={[styles.iconSpeech, { tintColor: tintColor }]}
                        />
                )
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        scrollEnabled: true,
        swipeEnabled: false,
        lazyLoad: true,
        animationEnabled: false,
        initialRouteName: 'DashboardStack',
        tabBarOptions: {
            activeTintColor: '#235fab',
            inactiveTintColor: '#7a7b7c',
            labelStyle: {
                // marginTop:10
                // fontSize: 9,
                // textTransform: "capitalize"
            },
            style: {
                backgroundColor: '#f6f8ff',
                height: 48,

            },
            showIcon: true,
            tabStyle: {
                paddingTop: 6
            }
        }
    }
);



//MyAccountStack
export const MyAccountStack = StackNavigator({
    ScreenMyAccount: {
        screen: ScreenMyAccount,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={globalStyles.headerTitle}>My Account</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader/>,
        })
    }
});

//SupportStack
export const SupportStack = StackNavigator({
    ScreenSupport: {
        screen: ScreenSupport,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={globalStyles.headerTitle}>Support</Text>
        })
    }
});

//RootStack
export const RootStack = StackNavigator({
    RootTab: {
        screen: RootTab,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    ScreenAddRoom: {
        screen: ScreenAddRoom
    },
    ScreenListDevicesToChoose: {
        screen: ScreenListDevicesToChoose
    },
    ActionDetailTab: {
        screen: ({ navigation }) => <ActionDetailTab screenProps={navigation} onNavigationStateChange={(prevState: any, currentState: any, action: any) => {
            AppStorage.postEvent("SET_FOCUSED_SCREEN", action.routeName);
        }} />,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={globalStyles.headerTitle}>{navigation.state.params.info.name}</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader/>,
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={navigation.state.params ? (navigation.state.params.screen == "ScreenThings" ? require('../image/add.png') : require('../image/setting.png')) : require('../image/add.png')}
                    style={[globalStyles.headerRightIcon]}
                />
            </TouchableOpacity>
        })
    },
    RoomDetailTab: {
        screen: ({ navigation }) => <RoomDetailTab screenProps={navigation} onNavigationStateChange={(prevState: any, currentState: any, action: any) => {
            AppStorage.postEvent("SET_FOCUSED_SCREEN", action.routeName);
        }} />,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={globalStyles.headerTitle}>{navigation.state.params.name}</Text>,
            headerStyle: globalStyles.headerStyle,
            headerBackground: <ImageHeader/>,
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('ScreenEditRoom',{...navigation.state.params,goBackToScreenRoom:()=>navigation.goBack()}) }}>
                <Image
                    source={require('../image/setting.png')}
                    style={[globalStyles.headerRightIcon]}
                />
            </TouchableOpacity>
        })
    },
    RoutineDetail: {
        screen: ScreenRoutineDetail,
    },
    ScreenEditRoom: {
        screen: ScreenEditRoom,
    }

},
    {
        // headerMode: 'none'
        // headerTransitionPreset:'uikit'
    });

//Slide Menu
export const RootApp = DrawerNavigator(
    {
        RootStack: {
            screen: RootStack
        },
        MyAccountStack: {
            screen: MyAccountStack
        },
        SupportStack: {
            screen: SupportStack
        },
    },
    {
        contentComponent: props => <ScreenSlideMenu {...props}></ScreenSlideMenu>
    }
);


//AuthenticationStack
export const AuthenticationStack = (isLogged: any) => {
    return StackNavigator(
        {
            ScreenLogin: {
                screen: ScreenLogin,
            },
            RootApp: {
                screen: RootApp,
            }
        },
        {
            headerMode: "none",
            initialRouteName: isLogged ? "RootApp" : "ScreenLogin"
        }
    );
}

var focusedUnderTabColor = '#005891';
var unfocusedUnderTabColor = '#655f61';
const styles = StyleSheet.create({
    icon: {
        width: 23,
        height: 19,
    },
    iconSpeech: {
        width: 11,
        height: 22,
    },
    label: {
        marginTop: -3,
        fontSize: 10
    },
    labelTop: {
        marginTop: 3,
        fontSize: 16
    },   
});
