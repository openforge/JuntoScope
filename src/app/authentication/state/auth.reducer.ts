import { createSelector, createFeatureSelector } from '@ngrx/store';

import {
  AuthActions,
  AuthActionTypes,
} from '@app/authentication/state/auth.actions';
import { User } from '@models/user';

export enum AuthUiState {
  UNKNOWN = 'Unknown',
  LOADING = 'Loading',
  AUTHENTICATED = 'Authenticated',
  NOT_AUTHENTICATED = 'Not Authenticated',
}

export interface AuthState {
  user: User;
  uiState: AuthUiState;
  error: string;
}

export const initialAuthState: AuthState = {
  user: null,
  uiState: AuthUiState.UNKNOWN,
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
      return { ...state, uiState: AuthUiState.LOADING };

    case AuthActionTypes.AUTHENTICATED:
      return {
        user: action.payload,
        uiState: AuthUiState.AUTHENTICATED,
        error: null,
      };

    case AuthActionTypes.NOT_AUTHENTICATED:
      return {
        user: null,
        uiState: AuthUiState.NOT_AUTHENTICATED,
        error: null,
      };

    case AuthActionTypes.AUTH_ERROR:
      return {
        user: null,
        uiState: AuthUiState.NOT_AUTHENTICATED,
        error: action.payload.message,
      };

    default:
      return state;
  }
}

export namespace AuthQuery {
  const selectSlice = createFeatureSelector<AuthState>('auth');
  export const selectUser = createSelector(selectSlice, state => state.user);
  export const selectUiState = createSelector(
    selectSlice,
    state => state.uiState
  );
  export const selectError = createSelector(selectSlice, state => state.error);
}
