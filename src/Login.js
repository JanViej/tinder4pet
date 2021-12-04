import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import background from './assets/image/background.png';
import logofull from './assets/image/logofull.png';
import paw from './assets/image/paw.png';
// import auth from '@react-native-firebase/auth';
import {login, logout} from './redux/auth/actions';
import {Formik} from 'formik';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-elements';
import {actions} from './redux/auth/slice';
import {writeDataToAccount} from './redux/account/actions';
import Notification from './components/Notification';

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
  modalWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 9,
    paddingLeft: 5,
  },
  btnCloseContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  buttonCloseStyle: {
    backgroundColor: '#fff',
    padding: 0,
    margin: 0,
  },
});

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.data);
  const loading = useSelector(state => state.auth.loading);
  const isNewUser = useSelector(state => state.auth.isNew);
  const [modalVisible, setModalVisible] = useState(false);
  const responseLogin = useSelector(state => state.auth.responseLogin);
  const [isVisible, setIsVisible] = useState(true);
  const handleClickForgot = () => {
    // dispatch(logout());
  };
  const handleClickSignUp = () => {
    navigation.push('Signup');
  };
  useEffect(() => {
    dispatch(logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isNewUser) {
      setModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      {responseLogin === 1 && (
        <Notification
          title="Login Fail"
          desc="This Account isnt exist. You can create a new one."
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
      {responseLogin === 2 && (
        <Notification
          title="Login Fail"
          desc="Your entered password is incorrect"
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
      {/* <Modal style={styles.modal} isVisible={modalVisible}>
        <View style={styles.modalWrapper}>
          <AntDesign name="checkcircle" color="#5fa4b7" size={18} />
          <Text style={styles.text}>Create account successfully!!!</Text>
          <Button
            onPress={() => {
              setModalVisible(false);
              dispatch(actions.setIsNew());
            }}
            title="x"
            titleStyle={{fontSize: 20, color: '#5fa4b7'}}
            containerStyle={styles.btnCloseContainer}
            buttonStyle={styles.buttonCloseStyle}
          />
        </View>
      </Modal> */}
      <ImageBackground source={background} style={styles.image}>
        <View style={{width: '100%', alignItems: 'center', marginTop: 100}}>
          <Image source={logofull} style={styles.logo} />
          <Text style={styles.title}>Tinder4pet</Text>
        </View>
        <ActivityIndicator
          animating={loading}
          size="large"
          color="#1F5D74"
          style={{
            position: 'absolute',
            left: '45%',
            top: '30%',
          }}
        />
        <Formik
          initialValues={{
            username: 'nhannguyen.tpdn@gmail.com',
            password: '123456',
          }}
          onSubmit={values => {
            dispatch(login(values));
          }}>
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
