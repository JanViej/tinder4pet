/*eslint-disable*/
import request from '.';

export const getCategoryApi = () => request.get('/category');

export const getDrinkApi = payload =>
  request.get('/drink', {
    params: payload,
  });

export const getDrinkByIdApi = id => request.get(`/drink/${id}`);

export const getFeedbackByIdApi = id => request.get(`/drink/${id}/feedback`);
