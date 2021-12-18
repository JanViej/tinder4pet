import request from '.';

export const createUserApi = data =>
  request.get(
    `AddUser/?account_id=4217711&user_name=${data?.username}&user_display_name=${data?.username}&user_password=123456&application_id=10400822&api_key=2ba039cd-997c-4add-b185-b17aaec6c932`,
  );
