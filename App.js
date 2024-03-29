/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import PushNotification from 'react-native-push-notification';
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
import {UserProvider} from './src/contexts/UserContext';
import PushController from './src/PushController';

const App: () => Node = () => {
  const [initializing, setInitializing] = useState(true);
  const currentUser = useSelector(state => state.auth.data);
  const loading = useSelector(state => state.auth.loading);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    console.log('asd subscriber', user);
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };
  const createChannels = () => {
    console.log('asdasd create');
    PushNotification.createChannel({
      channelId: 'rn-push-notification-channel-id',
      channelName: 'Test Channel',
    });
  };

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
    createChannels();
    // return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getAccount(user?._user?.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(user)]);

  // useEffect(() => {
  //   if (currentUser?.data) {
  //     dispatch(voximplantLogin(currentUser?.data?.voximplantUsername));
  //   }
  // }, [JSON.stringify(currentUser)]);

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
      {currentUser?.id && <PushController user={user} />}
    </NavigationContainer>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>
);

export default AppWrapper;
