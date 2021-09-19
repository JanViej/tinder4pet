import {createSlice} from '@reduxjs/toolkit';
import {getAccount, register, login} from './actions';

export const initialState = {
  data: {},
  loading: false,
  isAuthenticated: false,
  token: '',
  isActive: false,
  password: '',
  currentCategory: {},
};

export const {reducer, actions} = createSlice({
  name: 'Auth',
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, {payload}) => {
      state.loading = false;
    },
    [register.pending]: (state, {payload}) => {
      state.loading = true;
    },
    [register.rejected]: (state, {payload}) => {
      state.loading = false;
    },
    [getAccount.fulfilled]: (state, {payload}) => {
      state.data = payload;
      console.log('payload', payload);
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
  },
});

export default reducer;
