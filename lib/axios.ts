import Axios from 'axios';

import storage from '../utils/storage';

function authRequestInterceptor(config: any) {
  config.headers = config.headers ?? {};
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}
export const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
});
axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response: any) => {
    return response.data?.result ? response.data?.result : response.data;
  },
  (error: any) => {
    let message = error.response?.data?.message || error.message;
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      (error.response.data.error?.errors ||
        error.response.data.error?.error_params)
    ) {
      message =
        error.response.data.error?.errors.join(',') ||
        error.response.data.error?.error_params
          ?.map((e: any) => e.message || e.msg)
          ?.join(',');
    }
    // Handle Error
    // eslint-disable-next-line no-undef
    return Promise.reject({
      statusCode: error.response?.status,
      message: message
    });
  }
);
