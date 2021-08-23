import request from '.';

export const getListOrderByMeApi = headers =>
  request.get('/orders/me', headers);

export const createOrderApi = (params, headers) => {
  // console.log("dddd",  {"drink": params});
  request.post(
    '/orders',
    {
      "drink": params,
    },
    headers,
  );
};
