import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {uniqBy, compact} from 'lodash';
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
      let likeData = {};
      await firestore()
        .collection('account')
        .doc(`${payload.id}`)
        .get()
        .then(querySnapshot => {
          likeData = {
            ...querySnapshot?._data,
          };
        });
      await firestore()
        .collection('account')
        .doc(`${userData.id}`)
        .update({
          like: compact(
            uniqBy(
              [
                ...(userData.data.like || []),
                {
                  id: payload.id,
                  createdAt: payload.createdAt,
                },
              ],
              'id',
            ),
          ),
        });

      await firestore()
        .collection('account')
        .doc(`${payload.id}`)
        .update({
          liker: compact(
            uniqBy(
              [
                ...(likeData?.liker || []),
                {
                  id: userData.id,
                  createdAt: payload.createdAt,
                },
              ],
              'id',
            ),
          ),
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
      let dislikeData = {};
      await firestore()
        .collection('account')
        .doc(`${payload.id}`)
        .get()
        .then(querySnapshot => {
          dislikeData = {
            ...querySnapshot?._data,
          };
        });

      await firestore()
        .collection('account')
        .doc(`${userData.id}`)
        .update({
          dislike: compact(
            uniqBy(
              // eslint-disable-next-line no-sparse-arrays
              [
                ...(userData.data.dislike || []),
                ,
                {
                  id: payload.id,
                  createdAt: payload.createdAt,
                },
              ],
              'id',
            ),
          ),
        });

      await firestore()
        .collection('account')
        .doc(`${payload.id}`)
        .update({
          disliker: compact(
            uniqBy(
              [
                ...(dislikeData?.disliker || []),
                {
                  id: userData.id,
                  createdAt: payload.createdAt,
                },
              ],
              'id',
            ),
          ),
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
