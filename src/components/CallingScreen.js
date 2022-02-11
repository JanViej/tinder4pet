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
import Notification from './Notification';
import {useDispatch} from 'react-redux';
import {voximplantLogin} from '../redux/auth/actions';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const CallingScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callStatus, setCallStatus] = useState('Initializing...');
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');
  const [isLocalVideo, setLocalVideo] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [reason, setReason] = useState('');

  const {
    user,
    call: incomingCall,
    isIncomingCall,
    partnerUser,
    isVideoCall,
  } = route?.params;

  const voximplant = Voximplant.getInstance();

  const call = useRef(incomingCall);
  const endpoint = useRef(null);

  console.log('asd call', call, endpoint);

  // console.log(
  //   'asd endpoint',
  //   Voximplant.Hardware.CameraManager.getInstance().switchCamera('back'),
  // );
  const goBack = () => {
    navigation.goBack();
  };

  // useEffect(() => {
  //   dispatch(getUser({
  //     id:user?.
  //   }))
  // },[])

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
        sendVideo: isVideoCall,
        receiveVideo: isVideoCall,
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
        dispatch(voximplantLogin());
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
          // console.log(
          //   'asd videoStream',
          //   endpointEvent,
          //   endpointEvent.videoStream,
          // );
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
        },
      );
    };

    const showError = reason => {
      // console.log('asd 2');
      // Alert.alert('Call failed', `Reason: ${reason}`, [
      //   {
      //     text: 'Ok',
      //     onPress: navigation.goBack(),
      //   },
      // ]);
      setReason(reason);
      setIsVisible(true);
    };

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return () => {
      call.current?.off(Voximplant.CallEvents.Failed);
      call.current?.off(Voximplant.CallEvents.ProgressToneStart);
      call.current?.off(Voximplant.CallEvents.Connected);
      call.current?.off(Voximplant.CallEvents.Disconnected);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionGranted]);

  const onHangupPress = () => {
    console.log('asd press hangup');
    call?.current?.hangup();
    call.current?.off(Voximplant.CallEvents.Failed);
    call.current?.off(Voximplant.CallEvents.ProgressToneStart);
    call.current?.off(Voximplant.CallEvents.Connected);
    call.current?.off(Voximplant.CallEvents.Disconnected);
    dispatch(voximplantLogin());
    navigation.goBack();
  };

  return (
    <View style={styles.page}>
      {isVisible && (
        <Notification
          title="Call Fail"
          desc={reason}
          height={120}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          extraComponent={
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                borderTopWidth: 1,
                borderTopColor: '#000',
                flex: 1,
                width: '100%',
                alignItems: 'center',
                marginTop: 10,
                paddingTop: 10,
              }}>
              <Text>OK</Text>
            </TouchableOpacity>
          }
        />
      )}

      <ImageBackground
        source={{
          uri: partnerUser?.avatar,
        }}
        style={styles.image}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" color="white" size={25} />
        </TouchableOpacity>
        {remoteVideoStreamId && isVideoCall ? (
          <Voximplant.VideoView
            videoStreamId={remoteVideoStreamId}
            style={styles.remoteVideo}
          />
        ) : (
          <View />
        )}
        {/* <Voximplant.VideoView
          videoStreamId={remoteVideoStreamId}
          style={styles.remoteVideo}
        /> */}
        {isLocalVideo && isVideoCall ? (
          <Voximplant.VideoView
            videoStreamId={localVideoStreamId}
            style={styles.localVideo}
            showOnTop
          />
        ) : (
          <View />
        )}

        <View style={styles.cameraPreview}>
          <Text style={styles.name}>
            {partnerUser?.petName || endpoint.current?.displayName}
          </Text>
          <Text style={styles.phoneNumber}>{callStatus}</Text>
        </View>

        <CallActionBox
          onHangupPress={onHangupPress}
          call={call}
          setLocalVideo={setLocalVideo}
          isVideoCall={isVideoCall}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#474443',
  },
  cameraPreview: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
    position: 'absolute',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  localVideo: {
    width: 100,
    height: 150,
    backgroundColor: '#000',
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    bottom: 145,
    elevation: 100,
  },
  remoteVideo: {
    backgroundColor: '#474443',
    borderRadius: 10,
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 100,
    elevation: 0,
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
  },
});

export default CallingScreen;
