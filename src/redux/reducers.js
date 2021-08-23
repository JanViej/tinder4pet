/*eslint-disable*/
import {combineReducers} from '@reduxjs/toolkit';
import drink from './drink/slice';
import user from './user/slice';
import order from './order/slice';
import event from './event/slice';
import cart from './cart/slice';

const rootReducer = combineReducers({
  drink,
  user,
  order,
  event,
  cart,
});

export default rootReducer;
