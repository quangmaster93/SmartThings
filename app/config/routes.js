//@flow
import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import screenSlideMenu from '../screens/screenSlideMenu';
import screenLogin from '../screens/screenLogin';
import screenDashboardHome from '../screens/screenDashboardHome';
import screenActionDetail from '../screens/screenActionDetail';


//Slide Menu
export const SlideMenu = DrawerNavigator(
    {
        RootTab: {
            screen: RootTab
        },
        screenLogin:{
            screen: screenLogin
        }
    }, 
    {
        contentComponent: props => <screenSlideMenu {...props}></screenSlideMenu>
    }
);

//Tab
export const RootTab = TabNavigator(
    {
        DashboardStack: {
            screen: DashboardStack,
            title :"Dashboard"
        },
        MyhomeStack: {
            screen: MyhomeStack,
            title :"My home"
        },
        AutomationStack: {
            screen: AutomationStack,
            title :"Automation"
        },
        MarketplaceStack: {
            screen: MarketplaceStack,
            title :"Marketplace"
        }
    },
    {
        tabBarPosition: 'bottom',
        scrollEnabled :true
    }
);

//DashboardStack
export const DashboardStack = StackNavigator({
    screenDashboardHome: {
        screen: screenDashboardHome,
    },
    screenActionDetail: {
        screen: screenActionDetail
    }
});

//MyhomeStack
export const DetailStack = StackNavigator({
    DetailScreen: {
        screen: DetailScreen,
    }
});