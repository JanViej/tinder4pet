import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  Platform,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CallActionBox from './CallActionBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useNavigation, useRoute} from '@react-navigation/core';
import {Voximplant} from 'react-native-voximplant';
import {useSelector} from 'react-redux';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const CallingScreen = ({route, navigation}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callStatus, setCallStatus] = useState('Initializing...');
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');
  const userData = useSelector(state => state.auth.data);

  const {user, call: incomingCall, isIncomingCall} = route?.params;

  const voximplant = Voximplant.getInstance();

  const call = useRef(incomingCall);
  const endpoint = useRef(null);

  console.log('asd user', user, isIncomingCall);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if (!cameraGranted || !recordAudioGranted) {
        Alert.alert('Permissions not granted');
      } else {
        setPermissionGranted(true);
      }
    };

    if (Platform.OS === 'android') {
      getPermissions();
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }

    const callSettings = {
      video: {
        sendVideo: true,
        receiveVideo: true,
      },
    };

    const makeCall = async () => {
      call.current = await voximplant.call(user.user_name, callSettings);
      subscribeToCallEvents();
    };

    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      call.current.answer(callSettings);
    };

    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, callEvent => {
        console.log('asd callEvent', callEvent);
        showError(callEvent.reason);
      });
      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        console.log('asd 4');

        setCallStatus('Calling...');
      });
      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        console.log('asd 13');
        setCallStatus('Connected');
      });
      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        console.log('asd 1');
        navigation.goBack();
      });
      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        },
      );
      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
        console.log('asd callEvent', callEvent);
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      });
    };

    const subscribeToEndpointEvent = async () => {
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        endpointEvent => {
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
        },
      );
    };

    const showError = reason => {
      console.log('asd 2');
      Alert.alert('Call failed', `Reason: ${reason}`, [
        {
          text: 'Ok',
          onPress: navigation.goBack(),
        },
      ]);
    };

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionGranted]);

  const onHangupPress = () => {
    call.current.hangup();
    console.log('asd close');
  };

  return (
    <View style={styles.page}>
      <ImageBackground
        source={{
          uri: userData?.data?.avatar,
        }}
        style={styles.image}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" color="white" size={25} />
        </TouchableOpacity>

        <Voximplant.VideoView
          videoStreamId={remoteVideoStreamId}
          style={styles.remoteVideo}
        />
        <Voximplant.VideoView
          videoStreamId={localVideoStreamId}
          style={styles.localVideo}
        />

        <View style={styles.cameraPreview}>
          <Text style={styles.name}>{user?.user_display_name}</Text>
          <Text style={styles.phoneNumber}>{callStatus}</Text>
        </View>

        <CallActionBox onHangupPress={onHangupPress} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#7b4e80',
  },
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  localVideo: {
    width: 100,
    height: 150,
    backgroundColor: '#000',
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    bottom: 145,
  },
  remoteVideo: {
    backgroundColor: '#474443',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 100,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 16,
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  },
  image: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default CallingScreen;
