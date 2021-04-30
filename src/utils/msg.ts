import { FormErrors } from '@/types/forms';
import { AxiosError } from 'axios';

export function getFormErrors(error: AxiosError): FormErrors {
  if (error.response?.status == 400) {
    const data = error.response.data;
    if (data.errors) {
      return data as FormErrors;
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
