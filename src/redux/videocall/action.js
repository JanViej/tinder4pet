import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiWrapper} from '../../utils/redux';
// import api
import {
  createUserApi,
  deleteUserApi,
  updateUserApi,
  getUserApi,
} from '../../api/voximplant';

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

export const deleteUser = createAsyncThunk(
  'videocall/deleteUser',
  async (payload, thunkAPI) => {
    try {
      const {data} = await apiWrapper({}, deleteUserApi, payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const updateUser = createAsyncThunk(
  'videocall/updateUser',
  async (payload, thunkAPI) => {
    try {
      console.log('asd payload', payload);
      const {data} = await apiWrapper({}, updateUserApi, payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getUser = createAsyncThunk(
  'videocall/getUserApi',
  async (payload, thunkAPI) => {
    try {
      const {data} = await apiWrapper({}, getUserApi, payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
