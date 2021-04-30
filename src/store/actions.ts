import { login, registerUser } from '@/services/auth';
import { AuthToken, LoginCredentials, UserRegistration } from '@/types/auth';
import { camelCaseKeys } from '@/utils/obj';
import { ActionContext, ActionTree } from 'vuex';
import { Mutations, MutationTypes } from './mutations';
import { State } from './state';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export enum ActionTypes {
  LOGIN = 'LOGIN',
  REGISTER_USER = 'REGISTER_USER'
}

export type Actions = {
  [ActionTypes.LOGIN]({ commit }: AugmentedActionContext, payload: LoginCredentials): Promise<void>;
  [ActionTypes.REGISTER_USER]({ commit }: AugmentedActionContext, payload: UserRegistration): Promise<void>;
};

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.LOGIN]({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      login(credentials)
        .then((response) => {
          const tokenResponse = camelCaseKeys(response.data) as AuthToken;
          commit(MutationTypes.SET_TOKEN, tokenResponse)
          resolve()
        })
        .catch((error) => reject(error))
    })
  },
  [ActionTypes.REGISTER_USER]({ commit }, userData) {
    return new Promise((resolve, reject) => {
      registerUser(userData)
        .then((response) => {
          const tokenResponse = camelCaseKeys(response.data) as AuthToken;
          commit(MutationTypes.SET_TOKEN, tokenResponse)
          resolve()
        })
        .catch((error) => reject(error))
    })
  },
}
