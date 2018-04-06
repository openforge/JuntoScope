import { createSelector } from '@ngrx/store';

import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from '../../../../models/user';
import { AppState } from '../../state/app.state';

export enum AuthCase {
  LOADING = 'Loading',
  AUTHENTICATED = 'Authenticated',
  NOT_AUTHENTICATED = 'Not Authenticated',
}

export interface AuthState {
  user: User;
  authState: AuthCase;
  error: string;
}

export const initialAuthState: AuthState = {
  user: null,
  authState: AuthCase.NOT_AUTHENTICATED,
  error: null,
};

export function authReducer(
  state = initialAuthState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.GET_USER:
    case AuthActionTypes.LOGIN:
    case AuthActionTypes.LOGOUT:
      return { ...state, authState: AuthCase.LOADING };

    case AuthActionTypes.AUTHENTICATED:
      return {
        user: action.payload,
        authState: AuthCase.AUTHENTICATED,
        error: null,
      };

    case AuthActionTypes.NOT_AUTHENTICATED:
      return { user: null, authState: AuthCase.NOT_AUTHENTICATED, error: null };

    case AuthActionTypes.AUTH_ERROR:
      return {
        user: null,
        authState: AuthCase.NOT_AUTHENTICATED,
        error: action.payload.message,
      };

    default:
      return state;
  }
}

export namespace AuthQuery {
  const getSlice = (state: AppState) => state.auth;
  export const getUser = createSelector(getSlice, state => state.user);
  export const getAuthState = createSelector(
    getSlice,
    state => state.authState
  );
  export const getError = createSelector(getSlice, state => state.error);
}
