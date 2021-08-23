/*eslint-disable*/

import {createSlice} from '@reduxjs/toolkit';
import {getDrinkById} from './actions';

export const initialState = {
  cartItems: {}
};

export const {reducer, actions} = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: (state, {payload}) => {
      state.cartItems = {
        ...state.cartItems,
        [payload.id]: {
          ...state.cartItems[payload.id],
          id: payload.id,
          quantity: payload.quantity,
        }
      };
    },
    removeFromCart: (state, {payload}) => {
      delete state.cartItems[`${payload.id}`]
    },
    setQuantity: (state, {payload}) => {
      state.cartItems = {
        ...state.cartItems,
        [payload.id]: {
          ...state.cartItems[payload.id],
          quantity: payload.quantity,
        }
      }

      console.log(payload.quantity);
    },
    resetCart: (state) => {
      console.log("reset");
      state.cartItems = {}
    }
  },
  extraReducers: {
    [getDrinkById.fulfilled]: (state, {payload}) => {
      state.cartItems = {
        ...state.cartItems,
        [payload['_id']]: {
          ...state.cartItems[payload['_id']],
          id: payload['_id'],
          name: payload.name,
          price: payload.price,
          image: payload.image,
        }
      }
    }
  },
});

export default reducer;
