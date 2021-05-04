import { axios, removeBearerToken } from '@/plugins/axios';
import { AuthToken, ChangePasswordForm, LoginCredentials, UserRegistration } from '@/types/auth';
import { snakeCaseKeys } from '@/utils/obj';
import { AxiosResponse } from 'axios';

export function login(credentials: LoginCredentials): Promise<AxiosResponse<AuthToken>>{
  const url = `${process.env?.VUE_APP_AUTH_URL}/token`
  return axios.post<AuthToken>(url, credentials)
}

export function refreshToken(refreshToken: string): Promise<AxiosResponse<AuthToken>>{
  removeBearerToken();
  const url = `${process.env?.VUE_APP_AUTH_URL}/token/refresh`
  return axios.post(url, {refresh_token: refreshToken})
}

export function registerUser(data: UserRegistration): Promise<AxiosResponse<AuthToken>> {
  delete data['confirmPassword'];
  const userData = snakeCaseKeys(data);
  const url = `${process.env?.VUE_APP_AUTH_URL}/user/register`
  return axios.post<AuthToken>(url, userData)
}

export function changePassword(data: ChangePasswordForm): Promise<AxiosResponse> {
  delete data['confirmPassword'];
  const formData = snakeCaseKeys(data);
  const url = `${process.env?.VUE_APP_AUTH_URL}/user/password`
  return axios.put(url, formData);
}