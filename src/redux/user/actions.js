/*eslint-disable*/
import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiWrapper} from '../../utils/redux';
// import api
import {
  loginApi,
  updateUserApi,
  getMeApi,
  registerApi,
  changePasswordApi,
} from '../../api/user';
import {removeData, storeData} from '../../utils';

export const login = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().user.token;
      const {data} = await apiWrapper({}, loginApi, payload, {
        headers: {
          Authorization: 'Bearer token}',
        },
      });
      if (data.data.data.token) {
        await storeData(data.data.data.token, 'sessionToken');
        await storeData(data.data.data.active, 'active');
      }
      console.log('login', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async (payload, thunkAPI) => {
    try {
      await removeData('sessionToken');
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      const {data} = await apiWrapper({}, updateUserApi, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getMe = createAsyncThunk(
  'user/getMe',
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      const tk = token?.substring(1, token.length - 1);
      const {data} = await apiWrapper({}, getMeApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.log('err', error);
      return thunkAPI.rejectWithValue();
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (payload, thunkAPI) => {
    try {
      const res = await apiWrapper({}, registerApi, payload);
      console.log('regis', res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      const res = await apiWrapper({}, changePasswordApi, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('res pass', res);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
