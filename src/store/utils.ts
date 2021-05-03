import { UserInfo } from "@/types/auth";
import jwtdecode from 'jwt-decode';

export function getUserInfo(jwtToken: string): UserInfo {
  const payload: any = jwtdecode(jwtToken);
  const user: UserInfo = {
    id:         payload.sub || '',
    username:   payload.preferred_username || '',
    email:      payload.email || '',
    firstName:  payload.given_name || '',
    lastName:   payload.family_name || '',
    fullName:   payload.name || '',
    roles:      payload.realm_access?.roles || []
  };
  return user;
}