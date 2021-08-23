import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiWrapper} from '../../utils/redux';
// import api
import {getListOrderByMeApi, createOrderApi} from '../../api/order';
import {removeData, storeData} from '../../utils';
import {getDrinkByIdApi} from '../../api/drink';

export const getListOrderByMe = createAsyncThunk(
  'order/getListOrderByMe',
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      const {data} = await apiWrapper({}, getListOrderByMeApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("getList", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (payload, thunkAPI) => {
    try {
      console.log("create");
      const token = thunkAPI.getState().user.token;
      const res = await apiWrapper({}, createOrderApi, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await thunkAPI.dispatch(getListOrderByMe());
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getDrinkById = createAsyncThunk(
  'order/getDrinkById',
  async (payload, thunkAPI) => {
    try {
      const {data} = await apiWrapper({}, getDrinkByIdApi, payload);
      return data?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
