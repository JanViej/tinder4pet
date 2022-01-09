// import React, {Component} from 'react';
// import PushNotification from 'react-native-push-notification';
// // var PushNotification = require("react-native-push-notification");

// export default class PushController extends Component {
//   componentDidMount() {
//     PushNotification.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: function (token) {
//         console.log('TOKEN:', token.token);
//       },

//       // (required) Called when a remote or local notification is opened or received
//       onNotification: function (notification) {
//         console.log('NOTIFICATION:', notification);
//         // notification.userInteraction = true;
//         // PushNotification.createChannel({
//         //   channelId: 'tinder-4-pet-id-high-300',
//         //   channelName: 'tinder-4-pet',
//         // });
//         // PushNotification.localNotification({
//         //   ...notification,
//         //   // channelId: 'fcm_fallback_notification_channel',
//         //   soundName: 'default',
//         //   playSound: true,
//         //   userInteraction: false,
//         // });

//         // PushNotification.android.setAutoCancel(true);
//         // process the notification here

//         // required on iOS only
//         // notification.finish(PushNotificationIOS.FetchResult.NoData);
//       },
//       unRegister: function () {
//         PushNotification.unregister();
//       },
//       // Android only
//       senderID: '84625329035',
//       // iOS only
//       // permissions: {
//       //   alert: true,
//       //   badge: true,
//       //   sound: true,
//       // },
//       popInitialNotification: true,
//       requestPermissions: true,
//     });
//   }

//   render() {
//     return null;
//   }
// }

import React from 'react';
import messaging from '@react-native-firebase/messaging';
import {AppState, Platform} from 'react-native';

const NOTI_GRANT_STATUS = [
  messaging.AuthorizationStatus.AUTHORIZED,
  messaging.AuthorizationStatus.PROVISIONAL,
];
const Notification = ({
  onCheckNotiStatus = () => {},
  onInAppNotification = () => {},
  onBackground = () => {},
  onKillApp = () => {},
}) => {
  const appState = React.useRef(AppState.currentState);

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [_handleAppStateChange]);

  const _handleAppStateChange = React.useCallback(
    async nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        await checkNotiAppPermission();
      }
      appState.current = nextAppState;
    },
    [checkNotiAppPermission],
  );

  const checkNotiAppPermission = React.useCallback(async () => {
    try {
      // const authStatus = await messaging().hasPermission();
      // const enabled = NOTI_GRANT_STATUS.includes(authStatus);
      const enabled = true;
      if (enabled) {
        await getToken();
      } else {
        if (Platform.OS === 'ios') {
          const authorizationStatus = await messaging().requestPermission();
          if (!NOTI_GRANT_STATUS.includes(authorizationStatus)) {
            onCheckNotiStatus &&
              onCheckNotiStatus({status: false, token: null});
            if (messaging().isDeviceRegisteredForRemoteMessages) {
              await messaging().deleteToken();
              await messaging().unregisterDeviceForRemoteMessages();
            }
          }
        } else {
          onCheckNotiStatus && onCheckNotiStatus({status: false, token: null});
          if (messaging().isDeviceRegisteredForRemoteMessages) {
            await messaging().deleteToken();
            await messaging().unregisterDeviceForRemoteMessages();
          }
        }
      }
    } catch (error) {
      onCheckNotiStatus && onCheckNotiStatus({status: false, token: null});
      if (messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().deleteToken();
        await messaging().unregisterDeviceForRemoteMessages();
      }
    }
  }, [getToken, onCheckNotiStatus]);

  const getToken = React.useCallback(async () => {
    try {
      await registerDevice();
      const fcmToken = await messaging().getToken();
      console.log('asdasd fcmToken', fcmToken);
      if (fcmToken && typeof fcmToken === 'string') {
        onCheckNotiStatus && onCheckNotiStatus({status: true, token: fcmToken});
      }
    } catch (error) {
      // showErrorAlert({
      //   message: error?.message,
      // });
    }
  }, [onCheckNotiStatus]);

  const registerDevice = async () => {
    if (
      Platform.OS === 'ios' &&
      !messaging().isDeviceRegisteredForRemoteMessages
    ) {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  React.useEffect(() => {
    registerDevice();
    checkNotiAppPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onInAppNotification && onInAppNotification(remoteMessage);
    });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        onBackground && onBackground(remoteMessage);
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          onKillApp && onKillApp(remoteMessage);
        }
      });

    return unsubscribe;
  }, [checkNotiAppPermission, onBackground, onInAppNotification, onKillApp]);

  return null;
};

export default Notification;
