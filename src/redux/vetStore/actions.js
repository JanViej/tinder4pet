import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const getVet = createAsyncThunk(
  'vetStore/getVet',
  async (payload, thunkAPI) => {
    try {
      let vets = [];
      await firestore()
        .collection('vets')
        .get()
        .then(query => {
          query.forEach(doc => {
            vets.push({
              ...doc.data(),
              id: doc.id,
            });
          });
        });
      return vets;
    } catch (error) {}
  },
);

export const getStore = createAsyncThunk(
  'vetStore/getStore',
  async (payload, thunkAPI) => {
    try {
      let stores = [];
      await firestore()
        .collection('stores')
        .get()
        .then(query => {
          query.forEach(doc => {
            stores.push({
              ...doc.data(),
              id: doc.id,
            });
          });
        });
      return stores;
    } catch (error) {}
  },
);
