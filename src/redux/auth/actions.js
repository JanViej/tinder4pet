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
      console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
