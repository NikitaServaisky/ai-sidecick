import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './navigation';
import { registerRootComponent } from 'expo';

const Root = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <AppNavigator />
  </GestureHandlerRootView>
);

registerRootComponent(Root);