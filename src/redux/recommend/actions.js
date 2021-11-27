import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {uniqBy, compact} from 'lodash';

export const setMatch = createAsyncThunk(
  'recommend/setMatch',
  async (payload, thunkAPI) => {
    try {
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

      await firestore()
        .collection('account')
        .doc(`${payload.id}`)
        .update({
          match: currentData?.match
            ? uniqBy(
                [
                  ...currentData?.match?.map(e =>
                    e?.matchId === payload?.data?.matchId
                      ? {
                          ...e,
                          ...payload.data,
                        }
                      : e,
                  ),
                  payload.data,
                ],
                'matchId',
              )
            : [
                {
                  ...payload.data,
                },
              ],
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
