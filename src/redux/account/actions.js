import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {actions} from '../auth/slice';
import {updateUser} from '../videocall/action';
import {actions as homeAction} from '../home/slice';
import {uniqBy, compact} from 'lodash';

export const writeDataToAccount = createAsyncThunk(
  'account/write',
  async (payload, thunkAPI) => {
    try {
      await firestore()
        .collection('account')
        .doc(`${thunkAPI.getState().auth?.data?.id}`)
        .update({
          ...payload,
        });

      thunkAPI.dispatch(actions.setUserData(payload));
      if (payload?.oldPetName && payload?.petName !== payload.oldPetName) {
        await thunkAPI.dispatch(
          updateUser({
            username: thunkAPI.getState().auth?.data?.data?.voximplantUsername,
            newUsername: payload?.petName,
            id: thunkAPI.getState().auth?.data?.data?.voximplantUserId,
          }),
        );

        // await firestore()
        //   .collection('account')
        //   .doc(`${thunkAPI.getState().auth?.data?.id}`)
        //   .update({
        //     voximplantUsername: payload?.petName,
        //   });
        // thunkAPI.dispatch(
        //   actions.setUserData({
        //     voximplantUsername: payload?.petName,
        //   }),
        // );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addNewComment = createAsyncThunk(
  'account/addComment',
  async (payload, thunkAPI) => {
    try {
      const userData = thunkAPI.getState().auth.data;

      await firestore()
        .collection('account')
        .doc(payload.id)
        .update({
          ...payload.data,
        });

      if (payload.id !== userData.id) {
        thunkAPI.dispatch(homeAction.setPartnerData(payload.data));
      } else {
        thunkAPI.dispatch(actions.setUserData(payload.data));
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteComment = createAsyncThunk(
  'account/deleteComment',
  async (payload, thunkAPI) => {
    try {
      const partnerDetail = thunkAPI.getState().home.partnerDetail;
      const images = JSON.parse(JSON.stringify(partnerDetail))?.images?.find(
        e => e.url === payload.url,
      )?.comment;
      images?.splice(payload.index, 1);
      const imagesAfter = JSON.parse(JSON.stringify(partnerDetail))?.images.map(
        e => {
          if (e.url === payload.url) {
            return {
              comment: images,
              url: e.url,
            };
          }
          return e;
        },
      );

      await firestore()
        .collection('account')
        .doc(`${partnerDetail.id}`)
        .update({
          images: compact(
            uniqBy([...imagesAfter, ...(partnerDetail.images || [])], 'url'),
          ),
        });

      thunkAPI.dispatch(
        homeAction.setPartnerData({
          images: compact(
            uniqBy([...imagesAfter, ...(partnerDetail.images || [])], 'url'),
          ),
        }),
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteCommentMyImg = createAsyncThunk(
  'account/deleteCommentMyImg',
  async (payload, thunkAPI) => {
    try {
      const userData = thunkAPI.getState().auth.data.data;
      const images = JSON.parse(JSON.stringify(userData))?.images?.find(
        e => e.url === payload.url,
      )?.comment;
      images?.splice(payload.index, 1);

      const imagesAfter = JSON.parse(JSON.stringify(userData))?.images.map(
        e => {
          if (e.url === payload.url) {
            return {
              comment: images,
              url: e.url,
            };
          }
          return e;
        },
      );

      await firestore()
        .collection('account')
        .doc(`${userData.id}`)
        .update({
          images: compact(
            uniqBy([...imagesAfter, ...(userData.images || [])], 'url'),
          ),
        });

      thunkAPI.dispatch(
        actions.setUserData({
          images: compact(
            uniqBy([...imagesAfter, ...(userData.images || [])], 'url'),
          ),
        }),
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
