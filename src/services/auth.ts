import { axios } from '@/plugins/axios';
import { AuthToken, LoginCredentials, UserRegistration } from '@/types/auth';
import { snakeCaseKeys } from '@/utils/obj';
import { AxiosResponse } from 'axios';

export function login(credentials: LoginCredentials): Promise<AxiosResponse<AuthToken>>{
  const url = `${process.env?.VUE_APP_AUTH_URL}/token`
  return axios.post<AuthToken>(url, credentials)
}

export function registerUser(data: UserRegistration): Promise<AxiosResponse<AuthToken>> {
  delete data['confirmPassword'];
  const userData = snakeCaseKeys(data);
  const url = `${process.env?.VUE_APP_AUTH_URL}/user/register`
  return axios.post<AuthToken>(url, userData)
}