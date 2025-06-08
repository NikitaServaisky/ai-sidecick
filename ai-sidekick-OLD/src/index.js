import React from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Root = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
    <AppNavigator />
    </Provider>
  </GestureHandlerRootView>
);

registerRootComponent(Root);