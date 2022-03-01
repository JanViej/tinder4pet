import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {writeDataToAccount} from '../account/actions.js';
import {actions} from './slice.js';
import {actions as authAction} from '../auth/slice';
import {createUser} from '../videocall/action';
import {Voximplant} from 'react-native-voximplant';
import {APP_NAME, ACC_NAME} from '../../configs/Constants';
import moment from 'moment';

export const login = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    try {
      const response = await auth()
        .signInWithEmailAndPassword(payload?.username, payload?.password)
        .catch(error => {
          console.log('asdasd firebsae', error);
          if (error.message.includes('no user')) {
            return 1;
          } else if (error.message.includes('password is invalid')) {
            return 2;
          }
        });
      console.log('asdasd login', response);
      if (response !== 1 && response !== 2) {
        await thunkAPI.dispatch(getAccount(payload?.username));
        return response;
      } else {
        thunkAPI.dispatch(actions.setModalErrorLogin(response));
      }
    } catch (error) {
      console.log('asdasd login error', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const voximplantLogin = createAsyncThunk(
  'user/voximplantLogin',
  async (payload, thunkAPI) => {
    try {
      const voximplant = Voximplant.getInstance();
      const voximplantInfo = thunkAPI.getState().auth.voximplantInfo;
      console.log('asd voximplantInfo', voximplantInfo);
      let clientState = await voximplant.getClientState();
      if (clientState === Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect();
        await voximplant.login(
          `${voximplantInfo?.user_name}@${APP_NAME}.${ACC_NAME}.voximplant.com`,
          '123456',
        );
        console.log('asd login1');
      }
      if (clientState === Voximplant.ClientState.CONNECTED) {
        await voximplant.login(
          `${voximplantInfo?.user_name}@${APP_NAME}.${ACC_NAME}.voximplant.com`,
          '123456',
        );
        console.log('asd login2');
      }
      if (clientState === Voximplant.ClientState.LOGGED_IN) {
        console.log('asd asd login roii a');
      }
    } catch (e) {
      console.log('asd e', e);
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
        thunkAPI.dispatch(actions.setModalErrorLogin(0));

        const voximplantId = await thunkAPI.dispatch(
          createUser({
            username: response?.user?._user?.uid,
          }),
        );
        await firestore().collection('account').add({
          gmail: payload?.username,
          role: 'user',
          introStep: 'Questionnaire',
          isActive: true,
          voximplantUserId: voximplantId?.payload?.user_id,
          voximplantUsername: response?.user?._user?.uid,
          createdAt: moment().toISOString(),
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
      await thunkAPI.dispatch(
        writeDataToAccount({
          fcmToken: '',
        }),
      );
      const voximplant = Voximplant.getInstance();
      await voximplant.disconnect();
      await auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    } catch (error) {
      // console.log('asd er', error);
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
      if (res?.data?.role === 'admin') {
        thunkAPI.dispatch(actions.setModalErrorLogin(1));
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue();
      }
      if (!res?.data?.isActive || res?.data?.role === 'admin') {
        thunkAPI.dispatch(actions.setModalErrorLogin(4));
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue();
      }

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
