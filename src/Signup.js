/*eslint-disable*/
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {register} from './redux/user/actions';
navigator.geolocation = require('@react-native-community/geolocation');
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'column',
    zIndex: 0,
  },
  header: {
    marginBottom: 15,
    marginTop: 90,
  },
  title2: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F5D74',
  },
  title1: {
    fontSize: 32,
    color: '#1F5D74',
  },
  signup: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  signup1: {
    color: '#8dc1d0',
    fontSize: 16,
    marginBottom: 15,
  },
  signup2: {
    color: '#5ca4b8',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    color: '#1F5D74',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#e1eff5',
    paddingVertical: 15,
  },
  btnContainer: {
    justifyContent: 'flex-end',
    marginBottom: 30,
    flexGrow: 1,
  },
  buttonStyle: {
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#5fa2b7',
  },
  back: {
    backgroundColor: '#5fa4b7',
    padding: 5,
    borderRadius: 8,
    marginTop: 15,
    width: 30,
  },
});

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const [inputUsername, onChangeInputUsername] = useState('');
  const [inputPassword, onChangeInputPassword] = useState('');
  // const [inputAddress, onChangeInputAddress] = useState('');
  const [inputPhoneNo, onChangeInputPhoneNo] = useState('');
  const [value, setValue] = useState('');
  const [location, setLocation] = useState('');
  const width = Dimensions.get('window').width - 40;

  const onClickSignUp = () => {
    if (
      !(
        inputUsername.trim() &&
        value.trim() &&
        inputPassword.trim() &&
        inputPhoneNo.trim()
      )
    )
      createTwoButtonAlert();
    else {
      dispatch(
        register({
          username: inputUsername,
          password: inputPassword,
          phone: inputPhoneNo,
          address: value,
          position: location
        }),
      ).then(() => {
        navigation.push('Login');
      });
    }
  };

  const onClickLogin = () => {
    navigation.push('Login');
  };

  const onClickBack = () => {
    navigation.push('Menu');
  };

  const createTwoButtonAlert = () =>
    Alert.alert('', 'You have to fill all blank', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={onClickBack}>
        <AntDesign name="left" color="#fff" size={18} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title1}>Welcome to</Text>
        <Text style={styles.title2}>The Coffee</Text>
      </View>
      <View
        style={{
          position: 'relative',
          // backgroundColor: 'red',
          paddingBottom: 75
        }}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#5ca4b8"
          onChangeText={onChangeInputUsername}
          value={inputUsername}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#5ca4b8"
          onChangeText={onChangeInputPassword}
          value={inputPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#5ca4b8"
          onChangeText={onChangeInputPhoneNo}
          value={inputPhoneNo}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#5ca4b8"
          onChangeText={onChangeInputAddress}
          value={inputAddress}
        /> */}
        <View
          style={{
            maxHeight: 200,
            width: width,
            zIndex: 30,
            position: 'absolute',
            justifyContent: 'center',
            bottom: 0
          }}>
          <GooglePlacesAutocomplete
            placeholder="Address"
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              setValue(data.description);
              console.log('details', details.geometry.location)
              console.log('details', data.description)
              setLocation(details.geometry.location);

            }}
            query={{
              key: 'AIzaSyDGZOhb6qWmy1PLYJrLmtBho18Vasw0C_U',
              language: 'vi',
            }}
            fetchDetails={true}
            textInputProps={{
              placeholderTextColor: '#5ca4b8',
              onChangeText: text => {
                setValue(text);
              },
              value: value,
              borderRadius: 10,
            }}
            styles={{
              textInput: {
                height: 60,
                color: '#1F5D74',
                fontSize: 16,
                fontSize: 18,
                fontWeight: '600',
                backgroundColor: '#e1eff5',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />
        </View>
      </View>
      <View style={styles.signup}>
        <Text style={styles.signup1}>Already have an Account / </Text>
        <Text style={styles.signup2} onPress={onClickLogin}>
          Login here
        </Text>
      </View>
      <Button
        onPress={onClickSignUp}
        title="Sign up"
        titleStyle={{fontSize: 20}}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );
};

export default Signup;
