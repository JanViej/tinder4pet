import {createSlice} from '@reduxjs/toolkit';
import {getAccount, register, login, logout} from './actions';

export const initialState = {
  data: {},
  loading: false,
  isAuthenticated: false,
  token: '',
  isActive: false,
  password: '',
  currentCategory: {},
  isNew: false,
};

export const {reducer, actions} = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setUserData: (state, {payload}) => {
      state.data = {
        ...state.data,
        data: {
          ...state.data.data,
          ...payload,
        },
      };
    },
    setIsNew: state => {
      state.isNew = false;
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.isNew = true;
    },
    [register.pending]: (state, {payload}) => {
      state.loading = true;
    },
    [register.rejected]: (state, {payload}) => {
      state.loading = false;
    },
    [getAccount.fulfilled]: (state, {payload}) => {
      state.data = payload;
      state.loading = false;
    },
    [getAccount.pending]: (state, {payload}) => {
      state.loading = true;
    },
    [getAccount.rejected]: (state, {payload}) => {
      state.loading = false;
    },
    [login.fulfilled]: (state, {payload}) => {
      state.loading = false;
    },
    [login.pending]: (state, {payload}) => {
      state.loading = true;
    },
    [login.rejected]: (state, {payload}) => {
      state.loading = false;
    },
    [logout.fulfilled]: (state, {payload}) => {
      state.data = {};
    },
  },
});

export default reducer;
