/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import type {Node} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/redux/store';
import BottomNavigation from './src/BottomNavigation';
import {getAccount} from './src/redux/auth/actions';
import {useDispatch, useSelector} from 'react-redux';

const App: () => Node = () => {
  const [initializing, setInitializing] = useState(true);
  const currentUser = useSelector(state => state.auth.data);
  const loading = useSelector(state => state.auth.loading);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    console.log('subscriber', user);
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getAccount(user?._user?.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      {loading ? (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <ActivityIndicator
            animating={true}
            size="large"
            color="#1F5D74"
            style={{
              position: 'absolute',
              left: '45%',
              top: '45%',
            }}
          />
        </View>
      ) : (
        <BottomNavigation />
      )}
    </NavigationContainer>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
