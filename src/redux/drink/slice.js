import {createSlice} from '@reduxjs/toolkit';
import {getCategory, getDrink, getDrinkById, getFeedbackById} from './actions';

export const initialState = {
  categories: [],
  drinks: [],
  currentCategory: {},
  currentDrink: {},
  currentFeedbacks: {},
};

export const {reducer, actions} = createSlice({
  name: 'Drink',
  initialState,
  reducers: {
    setCurrentCategory: (state, {payload}) => {
      state.currentCategory = payload;
    },
  },
  extraReducers: {
    [getCategory.fulfilled]: (state, {payload}) => {
      state.categories = payload.data.data;
    },
    [getDrink.pending]: state => {
      state.loading = true;
    },
    [getDrink.fulfilled]: (state, {payload}) => {
      state.drinks = payload.data.data;
      state.loading = false;
    },
    [getDrink.rejected]: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
    [getDrinkById.fulfilled]: (state, {payload}) => {
      state.currentDrink = payload;
    },
    [getFeedbackById.fulfilled]: (state, {payload}) => {
      state.currentFeedbacks = payload;
    }
  },
});

export default reducer;
