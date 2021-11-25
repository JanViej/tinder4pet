import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {get} from 'lodash-es';

export const getMatch = createAsyncThunk(
  'room/getMatch',
  async (payload, thunkAPI) => {
    try {
      let res = {};
      await firestore()
        .collection('account')
        .doc(`${payload}`)
        .get()
        .then(querySnapshot => {
          res = {
            ...querySnapshot?._data,
          };
        });

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getPartnerData = createAsyncThunk(
  'room/getPartnerData',
  async (payload, thunkAPI) => {
    try {
      let res = {};
      await firestore()
        .collection('account')
        .doc(`${payload}`)
        .get()
        .then(querySnapshot => {
          res = {
            ...querySnapshot?._data,
          };
        });

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
