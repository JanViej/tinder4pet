import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiWrapper} from '../../utils/redux';
// import api
import {getEventApi} from '../../api/event';

export const getEvent = createAsyncThunk(
  'event/getEvent',
  async (payload, thunkAPI) => {
    try {
      const {data} = await apiWrapper({}, getEventApi);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);