import {createSlice} from '@reduxjs/toolkit';
import {uniqBy} from 'lodash';
import {getListOrderByMe, createOrder, getDrinkById} from './actions';

export const initialState = {
  historyData: {
    order: [],
    total: 0,
  },
};

export const {reducer, actions} = createSlice({
  name: 'Order',
  initialState,
  reducers: {},
  extraReducers: {
    [getListOrderByMe.fulfilled]: (state, {payload}) => {
      // state.drinks = payload.data.data;
      state.historyData = payload.data;
    },
    [createOrder.fulfilled]: (state, {payload}) => {
      // state.historyData = {
      //   ...state.historyData,
      //   order: [...state.historyData.order, payload],
      //   total: state.historyData.total + 1,
      // }
    },
    [getDrinkById.fulfilled]: (state, {payload}) => {}
  },
});

export default reducer;
