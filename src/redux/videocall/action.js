import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiWrapper} from '../../utils/redux';
// import api
import {createUserApi} from '../../api/voximplant';

export const createUser = createAsyncThunk(
  'videocall/createUser',
  async (payload, thunkAPI) => {
    try {
      const {data} = await apiWrapper({}, createUserApi, payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
