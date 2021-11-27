import {createSlice} from '@reduxjs/toolkit';
import {getMatch, getPartnerData} from './actions';

export const initialState = {
  matchData: [],
  partnerData: {},
  loading: false,
};

export const {reducer, actions} = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: {
    [getMatch.fulfilled]: (state, {payload}) => {
      state.matchData = payload.match;
      state.loading = false;
    },
    [getMatch.pending]: state => {
      state.loading = true;
    },
    [getMatch.rejected]: state => {
      state.loading = false;
    },
    [getPartnerData.fulfilled]: (state, {payload}) => {
      state.partnerData = payload;
    },
  },
});

export default reducer;
