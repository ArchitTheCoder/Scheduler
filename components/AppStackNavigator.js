import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeworkDetailsScreen from '../screens/HomeworkDetailsScreen';
import SchoolScheduleDetailsScreen from '../screens/SchoolScheduleDetailsScreen';
import Home from '../screens/HomeScreen';

export const AppStackNavigator = createStackNavigator(
  {
    HomeworkList: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    HomeworkDetails: {
      screen: HomeworkDetailsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    SchoolScheduleDetails: {
      screen: SchoolScheduleDetailsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    intialRouteName: 'HomeworkList',
  }
);
