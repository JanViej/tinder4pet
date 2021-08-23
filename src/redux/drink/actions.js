/*eslint-disable*/
import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiWrapper} from '../../utils/redux';
// import api
import {getCategoryApi, getDrinkApi, getDrinkByIdApi, getFeedbackByIdApi} from '../../api/drink';

export const getCategory = createAsyncThunk(
  'drink/getCategory',
  async (payload, thunkAPI) => {
    try {
      const {data} = await apiWrapper({}, getCategoryApi);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getDrink = createAsyncThunk(
  'drink/getDrink',
  async (payload, thunkAPI) => {
    try {
      const res = await apiWrapper({}, getDrinkApi, payload);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
export const getDrinkById = createAsyncThunk(
  'drink/getDrinkById',
  async (payload, thunkAPI) => {
    try {
      const {data} = await apiWrapper({}, getDrinkByIdApi, payload);
      console.log('curretn', data);
      return data?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getFeedbackById = createAsyncThunk(
  'drink/getFeedbackById',
  async (payload, thunkAPI) => {
    try {
      const {data} = await apiWrapper({}, getFeedbackByIdApi, payload);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
)
