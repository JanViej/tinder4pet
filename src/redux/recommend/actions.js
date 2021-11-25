import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const setMatch = createAsyncThunk(
  'recommend/setMatch',
  async (payload, thunkAPI) => {
    try {
      const userData = thunkAPI.getState().auth.data;
      await firestore()
        .collection('account')
        .doc(`${payload.id}`)
        .update({
          match: firestore.FieldValue.arrayUnion({
            id: userData?.id,
            avatar: userData?.data?.avatar,
            name: userData?.data?.petName,
            currentText: 'Say Hi to new friend',
            status: 'undone',
          }),
        });
      await firestore()
        .collection('account')
        .doc(`${userData.id}`)
        .update({
          match: firestore.FieldValue.arrayUnion(payload),
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
