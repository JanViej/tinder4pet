/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/redux/store';
import BottomNavigation from './src/BottomNavigation';
import Login from './src/Login';
import PhoneSignIn from './src/PhoneSignIn';
import IntroSlider from './src/IntroSlider';

const App: () => Node = navigation => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    console.log('subscriber', user);
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('subscriber', subscriber);
    // return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* {user ? <IntroSlider /> : <BottomNavigation />} */}
        <BottomNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;