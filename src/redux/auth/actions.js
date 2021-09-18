import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const login = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    try {
      const response = await auth().signInWithEmailAndPassword(
        payload?.username,
        payload?.password,
      );
      console.log('response', response);
      return response;
    } catch (error) {
      Alert.alert('Account is Invalid');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (payload, thunkAPI) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        payload?.username,
        payload?.password,
      );
      console.log('response', response);
      if (response) {
        await firestore().collection('account').add({
          gmail: payload?.username,
        });
        await thunkAPI.dispatch(logout());
        payload?.navigation.push('Login');
      }
      return response;
    } catch (error) {
      Alert.alert('Account is exist');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async (payload, thunkAPI) => {
    try {
      await auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
