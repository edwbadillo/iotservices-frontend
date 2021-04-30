import { AuthToken, UserInfo } from '@/types/auth';

const defaultAuthToken: AuthToken = {
  accessToken: localStorage.getItem('ACCESS_TOKEN') || '',
  refreshToken: localStorage.getItem('REFRESH_TOKEN') || '',
};

const defaultUserInfo: UserInfo = {
  id: '',
  username: '',
  fullName: '',
  firstName: '',
  lastName: '',
  email: '',
  roles: [],
};

export type State = {
  token: AuthToken;
  user: UserInfo;
};

export const state: State = {
  token: defaultAuthToken,
  user: defaultUserInfo,
};
