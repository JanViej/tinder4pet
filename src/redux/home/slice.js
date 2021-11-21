import {createSlice} from '@reduxjs/toolkit';
import {getAllUser, getUserById} from './actions';

export const initialState = {
  allUsersData: [],
  partnerDetail: {},
};

export const {reducer, actions} = createSlice({
  name: 'Home',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUser.fulfilled]: (state, {payload}) => {
      state.allUsersData = payload;
    },
    [getUserById.fulfilled]: (state, {payload}) => {
      state.partnerDetail = payload;
    },
  },
});

export default reducer;
