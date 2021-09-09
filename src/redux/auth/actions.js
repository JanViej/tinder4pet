import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const login = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    try {
      const response = await auth().signInWithEmailAndPassword(
        'nhannguyen.tpdn@gmail.com',
        '123456',
      );
      console.log('response', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (payload, thunkAPI) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        'nhan1.tpdn@gmail.com',
        '123456',
      );
      const writeData = await firestore().collection('account').add({
        gmail: 'nhan1.tpdn@gmail.com',
      });
      console.log('response hihi', writeData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
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
