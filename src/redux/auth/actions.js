import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {writeDataToAccount} from '../account/actions.js';

export const login = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    try {
      const response = await auth().signInWithEmailAndPassword(
        payload?.username,
        payload?.password,
      );
      console.log('response', response);
      thunkAPI.dispatch(getAccount(payload?.username));
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
        await thunkAPI.dispatch(logout());
        await firestore().collection('account').add({
          gmail: payload?.username,
          role: 'user',
          introStep: 'Login',
        });
        // payload?.navigation.push('Login2');
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

export const getAccount = createAsyncThunk(
  'user/account',
  async (payload, thunkAPI) => {
    try {
      const res = await firestore()
        .collection('account')
        .where('gmail', '==', payload)
        .get()
        .then(querySnapshot => {
          return {
            id: querySnapshot?._docs?.[0].id,
            data: querySnapshot?._docs?.[0]._data,
          };
        });
      thunkAPI.dispatch(
        writeDataToAccount({
          id: res.id,
        }),
      );
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
