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
import {
    Image,
    StyleSheet,
    Text,
    Button
} from 'react-native';
//DashboardStack
export const DashboardStack = StackNavigator({
    ScreenDashboardHome: {
        screen: ScreenDashboardHome,
        navigationOptions :({navigation})=>({
            title: 'TCQ',
            headerStyle: {
                backgroundColor: '#1153a5',
              },
            headerLeft :<Button title="Menu" onPress={()=>{navigation.navigate('DrawerToggle')}}>
            </Button>
          })
    },
    ScreenActionDetail: {
        screen: ScreenActionDetail,
        navigationOptions : ({navigation})=>({
            title: 'Action',
            headerStyle: {
                backgroundColor: '#1153a5',
              },
          })
    }
},
{
    navigationOptions:{

    }
}
);

//MyhomeTab
export const MyhomeTab = TabNavigator(
    {
        ScreenThings: {
            screen: ScreenThings,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? "#215eab" : '#655f61' }, styles.labelTop]}>Things</Text>
            }
        },
        ScreenRooms: {
            screen: ScreenRooms,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? "#215eab" : '#655f61' }, styles.labelTop]}>Rooms</Text>
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
            indicatorStyle:{
                backgroundColor:"#1153a5"
            }
        }
    }
);

//MyhomeStack
export const MyhomeStack = StackNavigator({
    MyhomeTab: {
        screen: MyhomeTab,
        navigationOptions: {
            headerTitle: 'My home',
            headerStyle: {
                backgroundColor: '#1153a5',
              },
        }
    }
});

//AutomationTab
export const AutomationTab = TabNavigator(
    {
        ScreenRoutines: {
            screen: ScreenRoutines,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? "#215eab" : '#655f61' }, styles.labelTop]}>Routines</Text>
            }
        },
        ScreenSmartApps: {
            screen: ScreenSmartApps,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? "#215eab" : '#655f61' }, styles.labelTop]}>SmartApps</Text>
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
            indicatorStyle:{
                backgroundColor:"#1153a5"
            }
        }
    }
);

//AutomationStack
export const AutomationStack = StackNavigator({
    AutomationTab: {
        screen: AutomationTab,
        navigationOptions: {
            headerTitle: 'Automation',
            headerStyle: {
                backgroundColor: '#1153a5',
              },
        }
    }
});

//VoiceStack
export const VoiceStack = StackNavigator({
    ScreenVoice: {
        screen: ScreenVoice,
        navigationOptions: {
            headerTitle: 'Speech',
            headerStyle: {
                backgroundColor: '#1153a5',
              },
        }
    }
});

//Tab
export const RootTab = TabNavigator(
    {
        DashboardStack: {
            screen: DashboardStack,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? "#235fab" : '#7a7b7c' }, styles.label]}>Dashboard</Text>,
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
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? "#235fab" : '#7a7b7c' }, styles.label]}>My home</Text>,
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
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? "#235fab" : '#7a7b7c' }, styles.label]}>Automation</Text>,
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
                tabBarLabel: ({ focused, tintColor }) => <Text style={[{ color: focused ? "#235fab" : '#7a7b7c' }, styles.label]}>Speech</Text>,
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
                height: 43,

            },
            showIcon: true,
            tabStyle: {
                paddingTop: 4
            }
        }
    }
);



//MyAccountStack
export const MyAccountStack = StackNavigator({
    ScreenMyAccount: {
        screen: ScreenMyAccount,
        navigationOptions: {
            headerTitle: 'My Account',
            headerStyle: {
                backgroundColor: '#1153a5',
              },
        }
    }
});

//SupportStack
export const SupportStack = StackNavigator({
    ScreenSupport: {
        screen: ScreenSupport,
        navigationOptions: {
            headerTitle: 'Support',
        }
    }
});

//Slide Menu
export const RootApp = DrawerNavigator(
    {
        RootTab: {
            screen: RootTab
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
        // fontWeight:"bold"
    }
    // tabLabel: {
    //     textTransform: "capitalize",
    // }
});
