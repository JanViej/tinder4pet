import React from 'react';
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
import {register} from './redux/auth/actions';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ScrollView} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  paw: {
    bottom: -30,
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

const SignUp = ({navigation}) => {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  const handleClickSignUp = () => {
    navigation.push('Login');
  };

  const SignupSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Too Short!').required('Required'),
    username: Yup.string().email('Invalid email').required('Required'),
  });

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <View style={{width: '100%', alignItems: 'center', marginTop: 90}}>
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
            username: '',
            password: '',
            retypedPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            if (values?.password === values.retypedPassword) {
              dispatch(
                register({
                  username: values?.username,
                  password: values?.password,
                  navigation: navigation,
                }),
              );
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
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
                {errors.username && touched.username ? (
                  <Text style={{color: '#ffac9c'}}>{errors.username}</Text>
                ) : null}
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
                {errors.password && touched.password ? (
                  <Text style={{color: '#ffac9c'}}>{errors.password}</Text>
                ) : null}
                <View style={styles.inputWrap}>
                  <Feather name="key" color="#6A9CFD" size={25} />
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Retype Password"
                    placeholderTextColor="#AEE4FF"
                    onChangeText={handleChange('retypedPassword')}
                    value={values.retypedPassword}
                  />
                </View>
                {values.password !== values.retypedPassword ? (
                  <Text style={{color: '#ffac9c'}}>
                    {values.password.trim()} {values.retypedPassword.trim()}
                    Password must match
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: '700',
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={styles.signInRow}>
          <Text style={{fontSize: 14}}>Already have an account? </Text>
          <TouchableOpacity onPress={handleClickSignUp}>
            <Text style={{color: '#6A9CFD', fontWeight: '700', fontSize: 15}}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.paw}>
          <Image source={paw} />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default SignUp;
