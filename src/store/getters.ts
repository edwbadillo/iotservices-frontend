import { GetterTree } from 'vuex';
import { state, State } from './state';

export type Getters = {
  isAuthenticated(state: State): boolean;
  firstName(state: State): string
};

export const getters: GetterTree<State, State> & Getters = {
  isAuthenticated: (state) => {
    return !!state.token.accessToken && !!state.token.refreshToken;
  },
  firstName: (state) => {
    return state.user.firstName;
  }
};
