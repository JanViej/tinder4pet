/*eslint-disable*/

import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiWrapper} from '../../utils/redux';
// import api
import {getDrinkByIdApi} from '../../api/drink';

export const getDrinkById = createAsyncThunk(
  'cart/getDrinkById',
  async (payload, thunkAPI) => {
    try {
      const {data} = await apiWrapper({}, getDrinkByIdApi, payload);
      return data?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
