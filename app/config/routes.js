//@flow
import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
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
import {
    Image,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';
import { AppStorage } from '../redux/AppStorage';
//DashboardStack
export const DashboardStack = StackNavigator({
    ScreenDashboardHome: {
        screen: ScreenDashboardHome,
        navigationOptions: ({ navigation }) => ({
            title: 'TCQ',
            headerTitle: <Text style={styles.headerTitle}>TCQ</Text>,
            headerStyle: {
                backgroundColor: stackBackgroundColor,
            },
            headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={require('../image/menu.png')}
                    style={[styles.menuIcon]}
                />
            </TouchableOpacity>,
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={require('../image/3dot-ve.png')}
                    style={[styles.headerRightIcon]}
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
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : '#655f61' }, styles.labelTop]}>Things</Text>
            }
        },
        ScreenRooms: {
            screen: ScreenRooms,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : '#655f61' }, styles.labelTop]}>Rooms</Text>
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
            indicatorStyle: {
                backgroundColor: '#00be82'
            }
        }
    }
);

//ActionDetailTab
const ActionDetailTab = TabNavigator(
    {
        ScreenRightNow: {
            screen: ScreenRightNow,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : '#655f61' }, styles.labelTop]}>Right Now</Text>
            }
        },
        ScreenRecently: {
            screen: ScreenRecently,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : '#655f61' }, styles.labelTop]}>Recently</Text>
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
            indicatorStyle: {
                backgroundColor: '#00be82'
            }
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
            headerTitle: <Text style={styles.headerTitle}>My home</Text>,
            headerStyle: {
                backgroundColor: stackBackgroundColor,
            },
            headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={require('../image/menu.png')}
                    style={[styles.menuIcon]}
                />
            </TouchableOpacity>,
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={navigation.state.params ? (navigation.state.params.screen == "ScreenThings" ? require('../image/add.png') : require('../image/setting.png')) : require('../image/add.png')}
                    style={[styles.headerRightIcon]}
                />
            </TouchableOpacity>
        })
    }

});


//AutomationTab
export const AutomationTab = TabNavigator(
    {
        ScreenRoutines: {
            screen: ScreenRoutines,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : '#655f61' }, styles.labelTop]}>Routines</Text>
            }
        },
        ScreenSmartApps: {
            screen: ScreenSmartApps,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : '#655f61' }, styles.labelTop]}>SmartApps</Text>
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
            indicatorStyle: {
                backgroundColor: '#00be82'
            }
        }
    }
);

//AutomationStack
export const AutomationStack = StackNavigator({
    AutomationTab: {
        screen: AutomationTab,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={styles.headerTitle}>Automation</Text>,
            headerStyle: {
                backgroundColor: stackBackgroundColor,
            },
            headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={require('../image/menu.png')}
                    style={[styles.menuIcon]}
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
            headerTitle: <Text style={styles.headerTitle}>Speech</Text>,
            headerStyle: {
                backgroundColor: stackBackgroundColor,
            },
            headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={require('../image/menu.png')}
                    style={[styles.menuIcon]}
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
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : '#7a7b7c' }, styles.label]}>Dashboard</Text>,
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
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : '#7a7b7c' }, styles.label]}>My home</Text>,
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
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : '#7a7b7c' }, styles.label]}>Automation</Text>,
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
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? focusedUnderTabColor : '#7a7b7c' }, styles.label]}>Speech</Text>,
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
            headerTitle: <Text style={styles.headerTitle}>My Account</Text>,
            headerStyle: {
                backgroundColor: stackBackgroundColor,
            },
        })
    }
});

//SupportStack
export const SupportStack = StackNavigator({
    ScreenSupport: {
        screen: ScreenSupport,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={styles.headerTitle}>Support</Text>
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
    ScreenAddRoom:{
        screen: ScreenAddRoom,
        navigationOptions: ({ navigation }) => ({
            navigationOptions: ({ navigation }) => ({
                title: 'Add a Room',
                headerTitle: <Text style={styles.headerTitle}>Add a Room</Text>,
                headerStyle: {
                    backgroundColor: stackBackgroundColor,
                },
                headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                    <Image
                        source={require('../image/menu.png')}
                        style={[styles.menuIcon]}
                    />
                </TouchableOpacity>,
                headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                    <Image
                        source={require('../image/3dot-ve.png')}
                        style={[styles.headerRightIcon]}
                    />
                </TouchableOpacity>
    
            })
        })
    },
    ActionDetailTab: {
        screen: ({ navigation }) => <ActionDetailTab screenProps={navigation} onNavigationStateChange={(prevState: any, currentState: any, action: any) => {
            AppStorage.postEvent("SET_FOCUSED_SCREEN", action.routeName);
        }} />,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={styles.headerTitle}>{navigation.state.params.info.name}</Text>,
            headerStyle: {
                backgroundColor: stackBackgroundColor,
            },
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('DrawerToggle') }}>
                <Image
                    source={navigation.state.params ? (navigation.state.params.screen == "ScreenThings" ? require('../image/add.png') : require('../image/setting.png')) : require('../image/add.png')}
                    style={[styles.headerRightIcon]}
                />
            </TouchableOpacity>
        })
    },
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
var screenActionDetail = {
    screen: ScreenActionDetail,
    navigationOptions: ({ navigation }) => ({
        title: 'Action',
        headerTitle: <Text style={styles.headerTitle}>Action</Text>,
        headerStyle: {
            backgroundColor: '#1153a5',
        },
    })
}
var stackBackgroundColor = '#00be82';
var focusedUnderTabColor = '#00be82';
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
    headerTitle: {
        color: "#ffffff",
        fontSize: 20,
        marginLeft: 12,
        marginTop: 6
    },
    menuIcon: {
        width: 32,
        height: 22,
        marginLeft: 10
    },
    headerRightIcon: {
        width: 30,
        height: 30,
        marginRight: 30
    }
});
