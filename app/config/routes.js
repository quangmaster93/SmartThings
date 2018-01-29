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
    Text
} from 'react-native';
//DashboardStack
export const DashboardStack = StackNavigator({
    ScreenDashboardHome: {
        screen: ScreenDashboardHome,
    },
    ScreenActionDetail: {
        screen: ScreenActionDetail
    }
});

//MyhomeTab
export const MyhomeTab = TabNavigator(
    {
        ScreenThings: {
            screen: ScreenThings,
            navigationOptions: {
                tabBarLabel: 'Things',
            }
        },
        ScreenRooms: {
            screen: ScreenRooms,
            navigationOptions: {
                tabBarLabel: 'Rooms',
            }
        }
    },
    {
        tabBarPosition: 'top',
        scrollEnabled: true,
        swipeEnabled: true,
        initialRouteName: 'ScreenThings',
        lazyLoad: true,
    }
);

//MyhomeStack
export const MyhomeStack = StackNavigator({
    MyhomeTab: {
        screen: MyhomeTab,
        navigationOptions: {
            headerTitle: 'My home',
        }
    }
});

//AutomationTab
export const AutomationTab = TabNavigator(
    {
        ScreenRoutines: {
            screen: ScreenRoutines,
            navigationOptions: {
                tabBarLabel: 'Routines',
            }
        },
        ScreenSmartApps: {
            screen: ScreenSmartApps,
            navigationOptions: {
                tabBarLabel: 'SmartApps',
            }
        }
    },
    {
        tabBarPosition: 'top',
        scrollEnabled: true,
        swipeEnabled: true,
        initialRouteName: 'ScreenRoutines',
        lazyLoad: true,
    }
);

//AutomationStack
export const AutomationStack = StackNavigator({
    AutomationTab: {
        screen: AutomationTab,
        navigationOptions: {
            headerTitle: 'Automation',
        }
    }
});

//VoiceStack
export const VoiceStack = StackNavigator({
    ScreenVoice: {
        screen: ScreenVoice,
        navigationOptions: {
            headerTitle: 'Speech',
        }
    }
});

//Tab
export const RootTab = TabNavigator(
    {
        DashboardStack: {
            screen: DashboardStack,
            navigationOptions: {
                tabBarLabel:(focused, tintColor)=> <Text style={[{color:focused?"#235fab":'#7a7b7c'}]}>D{"ashboard".toLowerCase()}</Text>,
                tabBarIcon: () => (
                    <Image
                        source={require('../image/db.png')}
                        style={styles.icon}
                    />
                )
            }
        },
        MyhomeStack: {
            screen: MyhomeStack,
            navigationOptions: {
                tabBarLabel:(focused, tintColor)=> <Text style={[{color:focused?"#235fab":'#7a7b7c'}]}>M{"y home".toLowerCase()}</Text>,
                tabBarIcon: () => (
                    <Image
                        source={require('../image/db.png')}
                        style={styles.icon}
                    />
                )
            }
        },
        AutomationStack: {
            screen: AutomationStack,
            navigationOptions: {
                tabBarLabel: 'Automation',
                tabBarLabel:(focused, tintColor)=> <Text style={[{color:focused?"#235fab":'#7a7b7c'}]}>A{"utomation".toLowerCase()}</Text>,
                tabBarIcon: () => (
                    <Image
                        source={require('../image/db.png')}
                        style={styles.icon}
                    />
                )
            }
        },
        VoiceStack: {
            screen: VoiceStack,
            navigationOptions: {
                tabBarLabel: 'Speech',
                tabBarLabel:(focused, tintColor)=> <Text style={[{color:focused?"#235fab":'#7a7b7c'}]}>S{"peech".toLowerCase()}</Text>,
                tabBarIcon: () => (
                    <Image
                        source={require('../image/db.png')}
                        style={styles.icon}
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
            // activeTintColor: '#235fab',
            // inactiveTintColor: '#7a7b7c',
            labelStyle: {
                // fontSize: 10,
                // textTransform: "capitalize"
            },
            style: {
                backgroundColor: 'blue',
            },
        }
    }
);



//MyAccountStack
export const MyAccountStack = StackNavigator({
    ScreenMyAccount: {
        screen: ScreenMyAccount,
        navigationOptions: {
            headerTitle: 'My Account',
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
        width: 26,
        height: 26,
    },
    // tabLabel: {
    //     textTransform: "capitalize",
    // }
});
