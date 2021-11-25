import {createSlice} from '@reduxjs/toolkit';
import {getMatch, getPartnerData} from './actions';

export const initialState = {
  matchData: [],
  partnerData: {},
};

export const {reducer, actions} = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: {
    [getMatch.fulfilled]: (state, {payload}) => {
      state.matchData = payload.match;
    },
    [getPartnerData.fulfilled]: (state, {payload}) => {
      state.partnerData = payload;
    },
  },
});

export default reducer;
