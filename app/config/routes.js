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
            headerTitle: 'Voice',
        }
    }
});

//Tab
export const RootTab = TabNavigator(
    {
        DashboardStack: {
            screen: DashboardStack,
            navigationOptions: {
                tabBarLabel: 'Dashboard',
            }
        },
        MyhomeStack: {
            screen: MyhomeStack,
            navigationOptions: {
                tabBarLabel: 'My home',
            }
        },
        AutomationStack: {
            screen: AutomationStack,
            navigationOptions: {
                tabBarLabel: 'Automation',
            }
        },
        VoiceStack: {
            screen: VoiceStack,
            navigationOptions: {
                tabBarLabel: 'Voice',
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        scrollEnabled: true,
        swipeEnabled: false,
        lazyLoad: true,
        animationEnabled: false,
        initialRouteName: 'DashboardStack'
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

