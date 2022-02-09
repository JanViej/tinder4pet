import {createSlice} from '@reduxjs/toolkit';
import {getVet, getStore} from './actions';

export const initialState = {
  vets: [],
  stores: [],
};

export const {reducer, actions} = createSlice({
  name: 'vetStore',
  initialState,
  reducers: {},
  extraReducers: {
    [getVet.fulfilled]: (state, {payload}) => {
      state.vets = payload;
    },
    [getStore.fulfilled]: (state, {payload}) => {
      state.stores = payload;
    },
  },
});

export default reducer;
