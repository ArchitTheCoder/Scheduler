import React, { Component } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeworkScreen from '../screens/HomeworkScreen';
import { AppStackNavigator } from './AppStackNavigator';
import HomeScreen from '../screens/HomeScreen';

export const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('../assets/home.png')}
          style={{ width: 33, height: 33 }}
        />
      ),
      tabBarLabel: 'Home',
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        style: { backgroundColor: '#04004e' },
      },
    },
  },
  Homework: {
    screen: HomeworkScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('../assets/scroll.png')}
          style={{ width: 26, height: 26 }}
        />
      ),
      tabBarLabel: 'Set Your Homework',
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        style: { backgroundColor: '#04004e' },
      },
    },
  },
});
