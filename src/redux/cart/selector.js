/*eslint-disable*/

import { createSelector } from 'reselect';

const getCartItemsState = state => state.cart.cartItems;

export const getDataCartItems = createSelector(
  [getCartItemsState],
  cartItemsData => {
    const cartItemsKeys = Object.keys(cartItemsData);
    return cartItemsKeys.map(cartItemsKey => ({
      ...cartItemsData?.[cartItemsKey]
    }))
  },
);

export const getTotalPrice = createSelector(
  [getCartItemsState],
  cartItemsData => {
    let total = 0;
    const cartItemsKeys = Object.keys(cartItemsData);
    let cartItems = cartItemsKeys.map(cartItemsKey => ({
      ...cartItemsData?.[cartItemsKey]
    }))

    if(cartItems){
      cartItems.forEach(cartItem => {
      total += cartItem.price * cartItem.quantity;
    });}
    return total;
  },
)

export const getItemsToCreate = createSelector(
  [getCartItemsState],
  cartItemsData => {
    const cartItemsKeys = Object.keys(cartItemsData);
    const list = cartItemsKeys.map(cartItemsKey => ({
      ...cartItemsData?.[cartItemsKey]
    }));
    const itemsToCreate = list.map((item) => {
      return {
        name: item.id,
        quantity: item.quantity,
      }
    });
    return itemsToCreate;
  }
)