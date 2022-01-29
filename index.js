/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import App from './App';
import PushNotification from 'react-native-push-notification';
import {name as appName} from './app.json';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token.token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    // notification.userInteraction = true;
    // PushNotification.createChannel({
    //   channelId: 'tinder-4-pet-id-high-300',
    //   channelName: 'tinder-4-pet',
    // });

    // PushNotification.android.setAutoCancel(true);
    // process the notification here

    // required on iOS only
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  // unRegister: function () {
  //   PushNotification.unregister();
  // },
  // Android only
  senderID: '84625329035',
  // iOS only
  // permissions: {
  //   alert: true,
  //   badge: true,
  //   sound: true,
  // },
  popInitialNotification: true,
  // requestPermissions: true,
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  PushNotification.localNotification({
    channelId: 'rn-push-notification-channel-id',
    title: remoteMessage?.notification?.title,
    message: remoteMessage?.notification?.body,
    largeIconUrl: remoteMessage?.notification?.android?.imageUrl,
  });
});

AppRegistry.registerComponent(appName, () => App);
