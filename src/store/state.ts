import { AuthToken, UserInfo } from '@/types/auth';
import { getUserInfo } from './utils';

const defaultAuthToken: AuthToken = {
  accessToken: localStorage.getItem('ACCESS_TOKEN') || '',
  refreshToken: localStorage.getItem('REFRESH_TOKEN') || '',
};


export type State = {
  token: AuthToken;
  user: UserInfo;
};

export const state: State = {
  token: defaultAuthToken,
  user: getUserInfo(defaultAuthToken.accessToken),
};
