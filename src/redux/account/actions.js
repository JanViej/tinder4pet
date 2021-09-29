import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

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

      return response;
    } catch (error) {
      // Alert.alert('Account is exist');
      return thunkAPI.rejectWithValue(error);
    }
  },
);
