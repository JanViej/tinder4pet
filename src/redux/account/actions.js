import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {actions} from '../auth/slice';

export const writeDataToAccount = createAsyncThunk(
  'account/write',
  async (payload, thunkAPI) => {
    try {
      const response = await firestore()
        .collection('account')
        .doc(`${thunkAPI.getState().auth?.data?.id}`)
        .update({
          ...payload,
        });

      thunkAPI.dispatch(actions.setUserData(payload));

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
