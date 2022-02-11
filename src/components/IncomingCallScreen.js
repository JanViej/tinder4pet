import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {Voximplant} from 'react-native-voximplant';
import {voximplantLogin} from '../redux/auth/actions';

const IncomingCallScreen = ({route, navigation}) => {
  const [caller, setCaller] = useState('');
  const {call, isVideoCall} = route.params;

  useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName);

    call.on(Voximplant.CallEvents.Disconnected, callEvent => {
      navigation.goBack();
    });

    return () => {
      call.off(Voximplant.CallEvents.Disconnected);
    };
  }, []);

  const onDecline = () => {
    call.decline();
    navigation.goBack();
  };

  const onAccept = async () => {
    try {
      if (Platform.OS === 'android') {
        let permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
        // permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);

        if (isVideoCall) {
          permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
        }
        const granted = await PermissionsAndroid.requestMultiple(permissions);
        const recordAudioGranted =
          granted['android.permission.RECORD_AUDIO'] === 'granted';
        const cameraGranted =
          granted['android.permission.CAMERA'] === 'granted';
        if (recordAudioGranted) {
          if (isVideoCall && !cameraGranted) {
            console.warn(
              'IncomingCallScreen: answerCall: camera permission is not granted',
            );
            Alert.alert('Permissions not granted');

            call.decline();
            return;
          } else {
            navigation.navigate('CallingScreen', {
              call,
              isIncomingCall: true,
              isVideoCall: isVideoCall,
            });
          }
        } else {
          console.warn(
            'IncomingCallScreen: answerCall: record audio permission is not granted',
          );
          Alert.alert('Permissions not granted');

          call.decline();
          return;
        }
      }
    } catch (e) {
      console.warn('IncomingCallScreen: asnwerCall:' + e);
      return;
    }
  };

  return (
    <ImageBackground
      source={{
        uri:
          'https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-9/158443288_485584589486043_3257253282849698384_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=kbqcWgOBDNYAX_g2z7n&_nc_ht=scontent.fdad3-4.fna&uss=93c415c7fabce7bd&odm=ZW5vdXZvLndvcmtwbGFjZS5jb20&oe2=61D76D2B&oh=00_AT8eIMchlD_aV3JNjKjFbiiKAGKL0DBTtxZWzWJ_S3OYjQ&oe=61B2EE33',
      }}
      style={styles.bg}
      resizeMode="cover">
      <Text style={styles.name}>{caller}</Text>
      <Text style={styles.phoneNumber}>
        {isVideoCall ? 'Video Call...' : 'Phone Call...'}
      </Text>

      <View style={styles.row}>
        {/* Decline Button */}
        <TouchableOpacity onPress={onDecline} style={styles.iconContainer}>
          <View style={styles.iconButtonContainer}>
            <Feather name="x" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </TouchableOpacity>

        {/* Accept Button */}
        <TouchableOpacity onPress={onAccept} style={styles.iconContainer}>
          <View
            style={[styles.iconButtonContainer, {backgroundColor: '#2e7bff'}]}>
            <Feather name="check" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 100,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: 'white',
    marginBottom: 300,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconText: {
    color: 'white',
    marginTop: 10,
  },
  iconButtonContainer: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },
  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  bg: {
    backgroundColor: '#474443',
    flex: 1,
    alignItems: 'center',
    // padding: 10,
    // paddingBottom: 50,
  },
});

export default IncomingCallScreen;
