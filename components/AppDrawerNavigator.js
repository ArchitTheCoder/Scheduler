import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import MyFinishedHomework from '../screens/FinishedHomeworkScreen';
import ScheduleScreen from '../screens/SchoolScheduleScreen';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: <AntDesign name="home" size={24} color="white" />,
      },
    },
    Finished_Homework: {
      screen: MyFinishedHomework,
      navigationOptions: {
        drawerIcon: <FontAwesome5 name="scroll" size={20} color="white" />,
      },
    },
    School_Schedule: {
      screen: ScheduleScreen,
      navigationOptions: {
        drawerIcon: <FontAwesome5 name="school" size={20} color="white" />,
      },
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    intialRouteName: 'Home',
  }
);
