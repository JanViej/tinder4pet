/*eslint-disable*/
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import background from './assets/image/background.png';
import logofull from './assets/image/logofull.png';
import paw from './assets/image/paw.png';

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // position: 'relative',
    // alignItems: 'center',
    flex: 1,
    // backgroundColor: 'red',
  },
  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  paw: {
    bottom: -10,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  input: {
    color: '#6A9CFD',
    paddingHorizontal: 10,
    marginVertical: 3,
    fontSize: 18,
    fontWeight: '600',
    width: '90%',
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
    marginTop: 30,
    elevation: 5,
  },
  btnLogin: {
    backgroundColor: '#6A9CFD',
    height: 50,
    borderRadius: 10,
    marginHorizontal: 30,
    elevation: 5,
    justifyContent: 'center',
  },
  signInRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 26,
    color: '#6A9CFD',
  },
});

const Login = ({navigation}) => {
  const [inputUsername, onChangeInputUsername] = useState('');
  const [inputPassword, onChangeInputPassword] = useState('');
  const handleClickSignIn = () => {
    navigation.navigate('Menu');
  };
  const handleClickForgot = () => {};
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <View style={{width: '100%', alignItems: 'center', marginTop: 100}}>
          <Image source={logofull} style={styles.logo} />
          <Text style={styles.title}>Tinder4pet</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrap}>
            <Ionicons name="ios-mail-outline" color="#6A9CFD" size={25} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#AEE4FF"
              onChangeText={onChangeInputUsername}
              value={inputUsername}
            />
          </View>
          <View style={styles.inputWrap}>
            <Feather name="key" color="#6A9CFD" size={25} />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#AEE4FF"
              onChangeText={onChangeInputPassword}
              value={inputPassword}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={handleClickSignIn}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={styles.signInRow}>
          <Text style={{fontSize: 14}}>Dont have an account? </Text>
          <TouchableOpacity onPress={handleClickSignIn}>
            <Text style={{color: '#6A9CFD', fontWeight: '700', fontSize: 15}}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signInRow} onPress={handleClickForgot}>
          <Text
            style={{
              color: '#6A9CFD',
              fontSize: 15,
              textDecorationLine: 'underline',
            }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
        <View style={styles.paw}>
          <Image source={paw} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
