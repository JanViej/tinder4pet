import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
  Image,
  ScrollView,
  Modal,
  Alert,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
// import UploadScreen from './UploadScreen';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const {width: windowWidth} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
  );
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      console.log('response', response?.assets?.[0]?.uri);
      if (response?.didCancel) {
        console.log('User cancelled image picker');
      } else if (response?.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response?.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response?.assets?.[0]?.uri};
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });
    try {
      const res = await task;
      console.log('res', res);
      if (res?.state === 'success') {
        Alert.alert(
          'Photo uploaded!',
          'Your photo has been uploaded to Firebase Cloud Storage!',
        );
      }
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    setImage(null);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onChangeGender = () => {};

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingVertical: 20,
          paddingHorizontal: 20,
          // elevation: 5,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="#000" size={20} />
          <Text style={{fontSize: 16, marginLeft: 5}}>Back</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 16, fontWeight: '700', marginRight: 10}}>
          Profile
        </Text>
        <TouchableOpacity>
          <Text style={{fontSize: 16}}>Done</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            // marginBottom: 40,
            marginTop: 40,
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: image.uri || image,
            }}
            style={styles.image}
          />
          <Text>Change Profile Picture</Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 25,
              right: windowWidth / 2 - 50,
              backgroundColor: '#fff',
              borderRadius: 100,
              padding: 5,
              elevation: 5,
            }}
            onPress={selectImage}>
            <Feather name="edit-2" color="#000" size={16} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrap}>
            <Text>Pet name</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#AEE4FF"
              // onChangeText={onChangeInputUsername}
              // value={inputUsername}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text>Breed</Text>
            <TextInput
              style={styles.input}
              placeholder="Breed"
              placeholderTextColor="#AEE4FF"
              // onChangeText={onChangeInputUsername}
              // value={inputUsername}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={showDatepicker}
              style={{
                ...styles.inputWrap,
                justifyContent: 'space-between',
                height: 50,
                width: '50%',
              }}>
              <Text>DOB</Text>
              <Text style={{marginHorizontal: 20, fontWeight: '700'}}>
                05/01/2021
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onChangeGender}
              style={{
                ...styles.inputWrap,
                justifyContent: 'space-between',
                height: 50,
                width: '45%',
              }}>
              <Text>Gender</Text>
              <Foundation name="male-symbol" color="#000" size={16} />
              <Foundation name="female-symbol" color="#ffac9c" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrap}>
            <Text>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#AEE4FF"
              // onChangeText={onChangeInputUsername}
              // value={inputUsername}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text>Owner Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Owner Name"
              placeholderTextColor="#AEE4FF"
              // onChangeText={onChangeInputUsername}
              // value={inputUsername}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#AEE4FF"
              // onChangeText={onChangeInputUsername}
              // value={inputUsername}
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              // display="default"
              onChange={onChange}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  name: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 100,
    margin: 10,
    backgroundColor: 'red',
  },
  inputContainer: {
    marginTop: 50,
    paddingHorizontal: 30,
    marginBottom: 35,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    elevation: 5,
  },
  modalView: {
    flex: 1,
    backgroundColor: '#5C5A5A74',
    alignItems: 'center',
  },
});
