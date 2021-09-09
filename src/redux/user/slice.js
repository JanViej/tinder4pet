/*eslint-disable*/

import {createSlice} from '@reduxjs/toolkit';
import { removeData } from '../../utils';
import {login, logout, updateUser, getMe} from './actions';

export const initialState = {
  data: [],
  loading: false,
  isAuthenticated: false,
  token: '',
  isActive: false,
  password: '',
  currentCategory: {},
};

export const {reducer, actions} = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setToken: (state, {payload}) => {
      state.token = payload;
      state.isAuthenticated = true;
    },
    setActive: (state, {payload}) => {
      state.isActive = payload.isActive;
      console.log('setActive', payload.isActive);
    },
    setInfo: (state, {payload}) => {
      state.data = {
        ...state.data,
        ...payload,
      };
    },
    setCurrentCategory: (state, {payload}) => {
      state.currentCategory = payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, {payload}) => {
      state.data = payload.data.data;
      state.isAuthenticated = true;
      state.token = payload.data.data.token;
    },
    [login.pending]: state => {
      state.loading = true;
    },
    [login.rejected]: (state, {payload}) => {
      // state.drinks = payload.data.data;
      state.loading = false;
    },
    [logout.fulfilled]: (state) => {
      state.isAuthenticated = false;
      state.token = '';
    },
    [updateUser.pending]: state => {
      state.loading = false;
    },
    [updateUser.fulfilled]: (state, {payload}) => {
      // state.data = payload.data.data;
    },
    [getMe.fulfilled]: (state, {payload}) => {
      state.data = payload.data.data;
      state.password = payload.data.data.password;
    }
  },
});

export default reducer;
