import {createSlice} from '@reduxjs/toolkit';
import {getAllUser} from './actions';

export const initialState = {
  allUsersData: [],
};

export const {reducer, actions} = createSlice({
  name: 'Home',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUser.fulfilled]: (state, {payload}) => {
      state.allUsersData = payload;
    },
  },
});

export default reducer;
