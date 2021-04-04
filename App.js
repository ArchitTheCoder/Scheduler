import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import { AppTabNavigator } from './components/AppTabNavigator';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContainer />
    </SafeAreaProvider>
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
  },
  Drawer: {
    screen: AppDrawerNavigator,
  },
});

const AppContainer = createAppContainer(switchNavigator);