import {createSlice} from '@reduxjs/toolkit';
import {getAllUser, getUserById} from './actions';

export const initialState = {
  allUsersData: [],
  partnerDetail: {},
};

export const {reducer, actions} = createSlice({
  name: 'Home',
  initialState,
  reducers: {
    setPartnerData: (state, {payload}) => {
      console.log('asd setPartnerData', payload);
      state.partnerDetail = {
        ...state.partnerDetail,
        ...payload,
      };
    },
  },
  extraReducers: {
    [getAllUser.fulfilled]: (state, {payload}) => {
      state.allUsersData = payload.allUsersData;
      state.users = payload.users;
    },
    [getUserById.fulfilled]: (state, {payload}) => {
      state.partnerDetail = payload;
    },
  },
});

export default reducer;
