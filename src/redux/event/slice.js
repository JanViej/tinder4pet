import {createSlice} from '@reduxjs/toolkit';
import {getEvent} from './actions';

export const initialState = {
  data: []
};

export const {reducer, actions} = createSlice({
  name: 'Event',
  initialState,
  reducers: {},
  extraReducers: {
    [getEvent.fulfilled]: (state, {payload}) => {
      state.data = payload.data;
    },
  }
});

export default reducer;
