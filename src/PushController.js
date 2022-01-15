import React, {Component, useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const NOTI_GRANT_STATUS = [
  messaging.AuthorizationStatus.AUTHORIZED,
  messaging.AuthorizationStatus.PROVISIONAL,
];

const PushController = () => {
  const registerDevice = async () => {};

  const getToken = useCallback(async () => {
    try {
      await registerDevice();
      const fcmToken = await messaging().getToken();
      if (fcmToken && typeof fcmToken === 'string') {
        console.log('fcmToken', fcmToken);
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
        smallIcon: 'ic_notification',
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    checkNotiAppPermission();
  }, [checkNotiAppPermission]);

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
