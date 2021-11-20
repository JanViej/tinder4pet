import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const getAllUser = createAsyncThunk(
  'home/getAllUser',
  async (payload, thunkAPI) => {
    try {
      const userData = thunkAPI.getState().auth.data;
      let users = [];
      await firestore()
        .collection('account')
        .where('role', '==', 'user')
        .get()
        .then(query => {
          query.forEach(doc => {
            users.push({
              ...doc.data(),
              id: doc.id,
            });
          });
        });
      return users.filter(item => item?.id !== userData.id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const reactLike = createAsyncThunk(
  'home/like',
  async (payload, thunkAPI) => {
    const userData = thunkAPI.getState().auth.data;

    try {
      await firestore()
        .collection('account')
        .doc(`${userData.id}`)
        .update({
          like: firestore.FieldValue.arrayUnion(payload),
        });

      await firestore()
        .collection('account')
        .doc(`${payload}`)
        .update({
          liker: firestore.FieldValue.arrayUnion(userData.id),
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const reactDislike = createAsyncThunk(
  'home/dislike',
  async (payload, thunkAPI) => {
    const userData = thunkAPI.getState().auth.data;

    try {
      await firestore()
        .collection('account')
        .doc(`${userData.id}`)
        .update({
          dislike: firestore.FieldValue.arrayUnion(payload),
        });

      await firestore()
        .collection('account')
        .doc(`${payload}`)
        .update({
          disliker: firestore.FieldValue.arrayUnion(userData.id),
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
