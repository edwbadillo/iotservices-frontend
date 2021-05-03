import { UserInfo } from "@/types/auth";
import jwtdecode from 'jwt-decode';

export function getUserInfo(jwtToken: any): UserInfo {
  if (!jwtToken) {
    return fromPayload({});
  }
  const payload: any = jwtdecode(jwtToken);
  return fromPayload(payload);
}

function fromPayload(payload: any) : UserInfo {
  return {
    id:         payload.sub || '',
    username:   payload.preferred_username || '',
    email:      payload.email || '',
    firstName:  payload.given_name || '',
    lastName:   payload.family_name || '',
    fullName:   payload.name || '',
    roles:      payload.realm_access?.roles || []
  } as UserInfo;
}