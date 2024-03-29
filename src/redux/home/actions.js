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
      return {
        allUsersData: users.filter(item => item?.id !== userData.id),
        users,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const reactLike = createAsyncThunk(
  'home/like',
  async (payload, thunkAPI) => {
    const userData = thunkAPI.getState().auth.data;

    console.log('asd payload', payload);

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

export const removeLove = createAsyncThunk(
  'home/removeLove',
  async (payload, thunkAPI) => {
    try {
      const userData = thunkAPI.getState().auth.data;
      const likeData = [...userData.data.like];
      const objLike = likeData.filter(item => item.id === payload.id)[0];
      const indexLike = likeData.indexOf(objLike);
      if (indexLike > -1) {
        likeData.splice(indexLike, 1);
      }

      const likerData = [...payload.dataDetail.liker];
      const objLiker = likerData.filter(item => item.id === userData.id)[0];
      const indexLiker = likerData.indexOf(objLiker);
      if (indexLiker > -1) {
        likerData.splice(indexLiker, 1);
      }

      firestore().collection('account').doc(`${payload.id}`).update({
        liker: likerData,
      });

      firestore().collection('account').doc(`${userData.id}`).update({
        like: likeData,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getUserById = createAsyncThunk(
  'home/getUserById',
  async (payload, thunkAPI) => {
    try {
      let parner = {};
      await firestore()
        .collection('account')
        .doc(`${payload}`)
        .get()
        .then(querySnapshot => {
          parner = {
            ...querySnapshot?._data,
          };
        });
      console.log('asd parner', parner);
      return parner;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
