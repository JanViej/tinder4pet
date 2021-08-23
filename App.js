/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/redux/store';
import BottomNavigation from './src/BottomNavigation';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
