import axios from 'axios';

const TIME_OUT = 15000;

const apiRequest = axios.create({
  baseURL: 'https://api.voximplant.com/platform_api/',
  timeout: TIME_OUT,
});

export const setAuthToken = token => {
  if (token) {
    // apiRequest.defaults.headers.common.Authorization = token;
  } else {
    // apiRequest.defaults.headers.common.Authorization = '';
  }
};

export default apiRequest;
