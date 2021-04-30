export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: string;
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Array<string>;
}

export interface UserRegistration {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
