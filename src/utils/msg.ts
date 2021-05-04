import { FormErrors } from '@/types/forms';
import { AxiosError } from 'axios';
import { camelCaseKeys } from './obj';

export function getFormErrors(error: AxiosError): FormErrors {
  if (error.response?.status == 400) {
    const data = error.response.data;
    if (data.errors) {
      const err = data as FormErrors;
      err.errors = camelCaseKeys(err.errors)
      return err
    }
  }
  return {
    errors: {},
  };
}

export const MSG_LOGIN_USERNAME_REQUIRED = 'Username or email required';
export const MSG_PASSWORD_REQUIRED = 'Password required';
export const MSG_INVALID_CREDENTIALS = 'Username or password incorrect';
export const MSG_PASSWORD_CONFIRMATION = 'Passwords must match';
