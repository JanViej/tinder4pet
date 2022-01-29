import React, {useEffect, useCallback} from 'react';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {writeDataToAccount} from './redux/account/actions';
import logo from './assets/image/logo.png';

const NOTI_GRANT_STATUS = [
  messaging.AuthorizationStatus.AUTHORIZED,
  messaging.AuthorizationStatus.PROVISIONAL,
];

const PushController = ({user}) => {
  const registerDevice = async () => {};
  const dispatch = useDispatch();
  const getToken = useCallback(async () => {
    try {
      await registerDevice();
      const fcmToken = await messaging().getToken();
      if (fcmToken && typeof fcmToken === 'string') {
        dispatch(
          writeDataToAccount({
            fcmToken: fcmToken,
          }),
        );
      }
    } catch (error) {}
  }, []);

  const checkNotiAppPermission = React.useCallback(async () => {
    try {
      const authStatus = await messaging().hasPermission();
      const enabled = NOTI_GRANT_STATUS.includes(authStatus);

      if (enabled) {
        await getToken();
      }
    } catch (error) {}
  }, [getToken]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(
        'asd emoteMessage?.notification?.android?.imageUrl',
        remoteMessage?.notification?.android?.imageUrl,
      );
      PushNotification.localNotification({
        channelId: 'rn-push-notification-channel-id',
        title: remoteMessage?.notification?.title,
        message: remoteMessage?.notification?.body,
        largeIconUrl: remoteMessage?.notification?.android?.imageUrl,
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      checkNotiAppPermission();
    }
  }, [checkNotiAppPermission, user]);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  }, []);

  return null;
};

export default PushController;
