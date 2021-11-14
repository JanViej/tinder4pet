import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {actions} from '../auth/slice';

export const writeDataToAccount = createAsyncThunk(
  'account/write',
  async (payload, thunkAPI) => {
    try {
      console.log('hihi start', thunkAPI.getState().auth?.data?.id);
      const response = await firestore()
        .collection('account')
        .doc(`${thunkAPI.getState().auth?.data?.id}`)
        .update({
          ...payload,
        });
      console.log('hihi', response);

      thunkAPI.dispatch(actions.setUserData(payload));

      return response;
    } catch (error) {
      // Alert.alert('Account is exist');
      return thunkAPI.rejectWithValue(error);
    }
  },
);
