import Axios, { Method, AxiosResponse } from 'axios';

import storage from '../utils/storage';

// Define the axios instance with interceptors
const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

function authRequestInterceptor(config: any) {
  config.headers = config.headers ?? {};
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
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
    return Promise.reject({
      statusCode: error.response?.status,
      message: message
    });
  }
);

// Define a generic API call function
async function apiCall<T = any>(
  method: Method,
  url: string,
  data?: any
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data
    });
    return response.data;
  } catch (error: any) {
    // You can handle specific errors or rethrow them
    throw error;
  }
}

export default apiCall;
