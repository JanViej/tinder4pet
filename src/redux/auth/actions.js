import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {writeDataToAccount} from '../account/actions.js';
import {actions} from './slice.js';
import {actions as authAction} from '../auth/slice';

export const login = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    try {
      const response = await auth()
        .signInWithEmailAndPassword(payload?.username, payload?.password)
        .catch(error => {
          if (error.message.includes('no user')) {
            return 1;
          } else if (error.message.includes('password is invalid')) {
            return 2;
          }
        });

      if (response !== 1 && response !== 2) {
        thunkAPI.dispatch(getAccount(payload?.username));
        return response;
      } else {
        thunkAPI.dispatch(actions.setModalErrorLogin(response));
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (payload, thunkAPI) => {
    try {
      const response = await auth()
        .createUserWithEmailAndPassword(payload?.username, payload?.password)
        .catch(error => {
          if (error.message.includes('email-already-in-use')) {
            thunkAPI.dispatch(
              authAction.setUserData({
                currentScreen: 'Signup',
              }),
            );
            thunkAPI.dispatch(actions.setModalErrorLogin(3));
            return null;
          }
        });
      if (response) {
        await firestore().collection('account').add({
          gmail: payload?.username,
          role: 'user',
          introStep: 'Questionnaire',
          isActive: true,
        });
        thunkAPI.dispatch(
          authAction.setUserData({
            gmail: payload?.username,
            role: 'user',
            introStep: 'Questionnaire',
            isActive: true,
          }),
        );
        return response;
      }
      return thunkAPI.rejectWithValue();
    } catch (error) {
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
