/*eslint-disable*/
import request from '.';

export const loginApi = (params) => request.post('/users/log-in', params);

export const updateUserApi = (params, header) => request.put('/users/update', params, header);

export const getMeApi = (headers) => request.get('/users/me', headers);

export const registerApi = (params) => request.post('/users/sign-up',params);

export const changePasswordApi = (params, header) => request.put('/users/me/password', params, header);