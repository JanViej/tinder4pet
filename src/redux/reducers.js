/*eslint-disable*/
import {combineReducers} from '@reduxjs/toolkit';
import drink from './drink/slice';
import user from './user/slice';
import order from './order/slice';
import event from './event/slice';
import cart from './cart/slice';
import auth from './auth/slice';
import account from './auth/slice';
import home from './home/slice'

const rootReducer = combineReducers({
  drink,
  user,
  order,
  event,
  cart,
  auth,
  account,
  home,
});

export default rootReducer;
