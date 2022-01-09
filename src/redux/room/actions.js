import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {uniqBy} from 'lodash';
import {actions} from '../auth/slice';
import {actions as roomActions} from './slice';

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
      // console.log(
      //   'asd res',
      //   res?.match?.filter(
      //     e =>
      //       e.deActiveId && e.deActiveId !== thunkAPI.getState().auth.data.id,
      //   ),
      // );
      // console.log('asd res', res?.match?.filter(e => e.match.));

      // return res?.match?.filter(
      //   e => e.deActiveId !== thunkAPI.getState().auth.data.id,
      // );
      return {
        matchData: res?.match?.filter(
          e => e.deActiveId !== thunkAPI.getState().auth.data.id,
        ),
        blockData: res?.match?.filter(
          e => e.deActiveId === thunkAPI.getState().auth.data.id,
        ),
      };
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

export const setBlock = createAsyncThunk(
  'room/setBlock',
  async (payload, thunkAPI) => {
    try {
      const like = JSON.parse(
        JSON.stringify(thunkAPI.getState().auth?.data?.data),
      )?.like?.filter(e => e.id !== payload.id);
      const liker = JSON.parse(
        JSON.stringify(thunkAPI.getState().auth?.data?.data),
      )?.liker?.filter(e => e.id !== payload.id);

      const newUserData = {
        block: uniqBy(
          [
            ...(thunkAPI.getState().auth?.data?.data?.block || []),
            {
              id: payload.id,
              isBlocker: true,
            },
          ],
          'id',
        ),
        like: like,
        liker: liker,
      };

      await firestore()
        .collection('account')
        .doc(`${thunkAPI.getState().auth?.data?.id}`)
        .update(newUserData);
      thunkAPI.dispatch(actions.setUserData(newUserData));

      let currentData = {};
      await firestore()
        .collection('account')
        .doc(`${payload.id}`)
        .get()
        .then(querySnapshot => {
          currentData = {
            ...querySnapshot?._data,
          };
        });

      const like1 = JSON.parse(JSON.stringify(currentData))?.like?.filter(
        e => e.id !== thunkAPI.getState().auth?.data?.id,
      );
      const liker1 = JSON.parse(JSON.stringify(currentData))?.liker?.filter(
        e => e.id !== thunkAPI.getState().auth?.data?.id,
      );

      await firestore()
        .collection('account')
        .doc(payload.id)
        .update({
          block: uniqBy(
            [
              ...(currentData.block || []),
              {
                id: thunkAPI.getState().auth?.data?.id,
                isBlocker: false,
              },
            ],
            'id',
          ),
          like: like1,
          liker: liker1,
        });
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const setUnblock = createAsyncThunk(
  'room/setUnBlock',
  async (payload, thunkAPI) => {
    try {
      const block = JSON.parse(
        JSON.stringify(thunkAPI.getState().auth?.data?.data),
      )?.block?.filter(e => e.id !== payload.id);

      await firestore()
        .collection('account')
        .doc(`${thunkAPI.getState().auth?.data?.id}`)
        .update({
          block,
        });

      thunkAPI.dispatch(actions.setUserData(block));
      thunkAPI.dispatch(roomActions.setUnblock(block));

      let currentData = {};
      await firestore()
        .collection('account')
        .doc(`${payload.id}`)
        .get()
        .then(querySnapshot => {
          currentData = {
            ...querySnapshot?._data,
          };
        });

      const block1 = JSON.parse(JSON.stringify(currentData))?.block?.filter(
        e => e.id !== thunkAPI.getState().auth?.data?.id,
      );

      await firestore().collection('account').doc(payload.id).update({
        block: block1,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
