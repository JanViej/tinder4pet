import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Voximplant} from 'react-native-voximplant';

const CallActionBox = ({onHangupPress, call, setLocalVideo, isVideoCall}) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [camFace, setCamFace] = useState('front');

  const onReverseCamera = () => {
    console.warn('onReverseCamera');
    if (camFace === 'front') {
      Voximplant.Hardware.CameraManager.getInstance().switchCamera('back');
      setCamFace('back');
    } else {
      Voximplant.Hardware.CameraManager.getInstance().switchCamera('front');
      setCamFace('front');
    }
  };

  const onToggleCamera = () => {
    setIsCameraOn(currentValue => !currentValue);
    call.current.sendVideo(!isCameraOn);
    setLocalVideo(!isCameraOn);
  };

  const onToggleMicrophone = () => {
    setIsMicOn(currentValue => !currentValue);
    call.current.sendAudio(!isMicOn);
  };

  return (
    <View style={styles.buttonsContainer}>
      {isVideoCall && (
        <>
          <TouchableOpacity onPress={onReverseCamera} style={styles.iconButton}>
            <Ionicons name="ios-camera-reverse" size={30} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onToggleCamera} style={styles.iconButton}>
            <MaterialIcons
              name={isCameraOn ? 'camera' : 'camera-off'}
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={onToggleMicrophone} style={styles.iconButton}>
        <MaterialIcons
          name={isMicOn ? 'microphone' : 'microphone-off'}
          size={30}
          color={'white'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onHangupPress}
        style={[styles.iconButton, {backgroundColor: 'red'}]}>
        <MaterialIcons name="phone-hangup" size={30} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: '#333333',
    padding: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 50,
  },
});

export default CallActionBox;
