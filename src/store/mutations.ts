import { AuthToken } from '@/types/auth';
import { MutationTree } from 'vuex';
import { State } from './state';
import { setBearerToken } from '@/plugins/axios';
import { getUserInfo } from './utils';

export enum MutationTypes {
  SET_TOKEN = 'SET_TOKEN',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_TOKEN](state: S, payload: AuthToken): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TOKEN](state, payload) {
    state.user = getUserInfo(payload.accessToken);
    state.token = payload;
    localStorage.setItem('ACCESS_TOKEN', payload.accessToken);
    localStorage.setItem('REFRESH_TOKEN', payload.refreshToken);
    setBearerToken(payload.accessToken);
  },
};
