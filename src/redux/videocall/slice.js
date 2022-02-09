import {createSlice} from '@reduxjs/toolkit';
import {getUser} from './action';

export const initialState = {
  currentUser: {},
};

export const {reducer, actions} = createSlice({
  name: 'videocall',
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.fulfilled]: (state, {payload}) => {
      state.currentUser = payload;
    },
  },
});

export default reducer;
