import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
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
// import auth from '@react-native-firebase/auth';
import {login, logout} from './redux/auth/actions';
import {Formik} from 'formik';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  const dispatch = useDispatch();

  const handleClickForgot = () => {
    dispatch(logout());
  };
  const handleClickSignUp = () => {
    // dispatch(register());
    navigation.push('Signup');
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <View style={{width: '100%', alignItems: 'center', marginTop: 100}}>
          <Image source={logofull} style={styles.logo} />
          <Text style={styles.title}>Tinder4pet</Text>
        </View>
        <Formik
          initialValues={{
            username: 'nhannguyen.tpdn@gmail.com',
            password: '123456',
          }}
          onSubmit={values => dispatch(login(values))}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrap}>
                  <Ionicons name="ios-mail-outline" color="#6A9CFD" size={25} />
                  <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#AEE4FF"
                    onChangeText={handleChange('username')}
                    value={values.username}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <Feather name="key" color="#6A9CFD" size={25} />
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="#AEE4FF"
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
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
            </View>
          )}
        </Formik>
        <View style={styles.signInRow}>
          <Text style={{fontSize: 14}}>Dont have an account? </Text>
          <TouchableOpacity onPress={handleClickSignUp}>
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
