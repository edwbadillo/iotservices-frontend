import { AppErrorListener } from '@/types/listeners';
import axios, { AxiosError } from 'axios';

export function setBearerToken(token: string): void {
  axios.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export function removeBearerToken(): void {
  delete axios.defaults.headers['Authorization'];
}

export function isNetworkError(error: AxiosError): boolean {
  return !error.response?.status;
}

export function setErrorResponseListener(listener: AppErrorListener) {
  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    if (isNetworkError(error)) {
      console.log('SERVER IS DOWN OR CLIENT CONNECTION PROBLEM');
      console.log('SHOW 503 PAGE');
      listener.onNetworkError();
      return Promise.reject(error);
    }

    const statusCode = error.response?.status;
    switch (statusCode) {
      case 401:
        if (isRefreshTokenRequest(error)) {
          listener.onUnauthorized();
        } else if (!isLoginRequest(error)) {
          return listener.refreshToken().then((accessToken) => {
            //Retry request.
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios.request(error.config);
          });
        }
        break;

      case 403:
      case 404:
      case 500:
      case 503:
        console.error('SHOW PAGE ' + statusCode);
        listener.onError(statusCode);
        break;
    }
    return Promise.reject(error);
  });
}

function isLoginRequest(error: AxiosError) {
  return (
    error.config.url?.endsWith('/auth/token') && error.config.method == 'post'
  );
}

function isRefreshTokenRequest(error: AxiosError) {
  return (
    error.config.url?.endsWith('/auth/token/refresh') &&
    error.config.method == 'post'
  );
}

export { axios };
