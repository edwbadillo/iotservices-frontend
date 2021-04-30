import { AuthToken, UserInfo } from '@/types/auth';
import { MutationTree } from 'vuex';
import { State } from './state';
import jwtdecode from 'jwt-decode';
import { setBearerToken } from '@/plugins/axios';

export enum MutationTypes {
  SET_TOKEN = 'SET_TOKEN',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_TOKEN](state: S, payload: AuthToken): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TOKEN](state, payload) {
    const jwtPayload = jwtdecode(payload.accessToken);
    state.user = getUserInfo(jwtPayload);
    state.token = payload;
    localStorage.setItem('ACCESS_TOKEN', payload.accessToken);
    localStorage.setItem('REFRESH_TOKEN', payload.refreshToken);
    setBearerToken(payload.accessToken);
  },
};

function getUserInfo(jwtPayload: any): UserInfo {
  const user: UserInfo = {
    id:         jwtPayload.sub,
    username:   jwtPayload.preferred_username,
    email:      jwtPayload.email,
    firstName:  jwtPayload.given_name,
    lastName:   jwtPayload.family_name,
    fullName:   jwtPayload.name,
    roles:      jwtPayload.realm_access.roles
  };
  return user;
}
