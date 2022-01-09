import {createSlice} from '@reduxjs/toolkit';
import {getMatch, getPartnerData} from './actions';

export const initialState = {
  matchData: [],
  partnerData: {},
  loading: false,
  blockData: [],
};

export const {reducer, actions} = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setUnblock: (state, {payload}) => {
      state.blockData = payload;
    },
    setBlockData: (state, {payload}) => {
      state.matchData = [...state.matchData, payload];
    },
  },
  extraReducers: {
    [getMatch.fulfilled]: (state, {payload}) => {
      state.matchData = payload.matchData;
      state.loading = false;
      state.blockData = payload.blockData;
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
