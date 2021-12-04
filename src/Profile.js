import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
// import UploadScreen from './UploadScreen';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import {writeDataToAccount} from './redux/account/actions';
import Notification from './components/Notification';

const {width: windowWidth} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [modal, setShowModal] = useState(false);
  const [image, setImage] = useState(userData?.data?.avatar);
  const [uploading, setUploading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [date, setDate] = useState(userData?.data?.dob);
  const [gender, setGender] = useState(userData?.data?.petGender === 'male');

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
    if (uri) {
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const task = storage().ref(filename).putFile(uploadUri);
      // set progress state
      try {
        await task;
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          dispatch(
            writeDataToAccount({
              avatar: downloadURL,
              images: [
                ...(userData?.data?.images || []),
                {
                  url: downloadURL,
                },
              ],
            }),
          );
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    if (userData) {
      setInitialValues({
        name: userData?.data?.petName,
        address: userData?.data?.address,
        sex: userData?.data?.petGender,
        dob: date,
        breed: userData?.data?.breed,
        phoneNumber: userData?.data?.phoneNumber,
        ownerName: userData?.data?.ownerName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <>
      <Notification
        title="Success"
        desc="Edit successfully"
        isVisible={modal}
        setIsVisible={setShowModal}
      />
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={values => {
          setUploading(true);
          dispatch(
            writeDataToAccount({
              petName: values?.name,
              breed: values?.breed,
              ...(date && {
                dob: date,
              }),
              address: values?.address,
              petGender: gender ? 'male' : 'female',
              phoneNumber: values?.phoneNumber,
              ownerName: values?.ownerName,
            }),
          );

          uploadImage();
          setUploading(false);
          setShowModal(true);
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
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
              <TouchableOpacity onPress={handleSubmit}>
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
                    uri: image?.uri || image,
                  }}
                  style={styles.image}
                />
                <Text>Change Profile Picture</Text>
                {uploading && (
                  <ActivityIndicator
                    animating={true}
                    size="large"
                    color="#ffac9c"
                    style={{
                      position: 'absolute',
                      left: '45%',
                      top: '100%',
                    }}
                  />
                )}

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
                    placeholder="Enter your pet name"
                    placeholderTextColor="#FEE5E1"
                    onChangeText={handleChange('name')}
                    value={values.name}
                    onBlur={handleBlur('phoneNumber')}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <Text>Breed</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter breed"
                    placeholderTextColor="#FEE5E1"
                    onChangeText={handleChange('breed')}
                    value={values.breed}
                    onBlur={handleBlur('breed')}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
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
                      {date ? moment(date).format('DD/MM/YYYY') : 'Select DOB'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setGender(!gender);
                    }}
                    style={{
                      ...styles.inputWrap,
                      justifyContent: 'space-between',
                      height: 50,
                      width: '45%',
                    }}>
                    <Text>Gender</Text>
                    <Foundation
                      name="male-symbol"
                      color={`${!gender ? '#000' : '#6A9CFD'}`}
                      {...(!gender
                        ? {
                            size: 16,
                          }
                        : {
                            size: 24,
                          })}
                    />
                    <Foundation
                      name="female-symbol"
                      color={`${gender ? '#000' : '#ffac9c'}`}
                      {...(gender
                        ? {
                            size: 16,
                          }
                        : {
                            size: 24,
                          })}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputWrap}>
                  <Text>Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Address"
                    placeholderTextColor="#FEE5E1"
                    onChangeText={handleChange('address')}
                    value={values.address}
                    onBlur={handleBlur('address')}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <Text>Owner Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#FEE5E1"
                    onChangeText={handleChange('ownerName')}
                    value={values.ownerName}
                    onBlur={handleBlur('ownerName')}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <Text>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter phone number"
                    placeholderTextColor="#FEE5E1"
                    onChangeText={handleChange('phoneNumber')}
                    value={values.phoneNumber}
                    onBlur={handleBlur('phoneNumber')}
                  />
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date || new Date()}
                    mode={mode}
                    is24Hour={true}
                    // display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        )}
      </Formik>
    </>
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
  input: {
    color: '#000',
    paddingLeft: 20,
    fontWeight: 'bold',
    width: '100%',
  },
});
