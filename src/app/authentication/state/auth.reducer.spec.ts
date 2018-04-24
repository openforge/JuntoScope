import * as fromAuth from '@app/authentication/state/auth.reducer';
import { AppState } from '@app/state/app.state';
import {
  GetUserAction,
  LoginAction,
  LogoutAction,
  AuthenticatedAction,
  NotAuthenticatedAction,
  AuthErrorAction,
} from '@app/authentication/state/auth.actions';
import { User } from '@models/user';

const testUser: User = { uid: 'testUid', displayName: 'testName' };

describe('Auth Reducer', () => {
  describe('undefined action', () => {
    it('should return default state', () => {
      const { initialAuthState: expected } = fromAuth;
      const action = {} as any;

      const state = fromAuth.authReducer(undefined, action);

      expect(state).toBe(expected);
    });
  });

  describe('GET_USER action', () => {
    it('should set authState to LOADING', () => {
      const { initialAuthState } = fromAuth;
      const expected: fromAuth.AuthState = {
        user: null,
        authState: fromAuth.AuthUiState.LOADING,
        error: null,
      };
      const action = new GetUserAction();

      const state = fromAuth.authReducer(initialAuthState, action);

      expect(state).toEqual(expected);
    });
  });

  describe('LOGIN action', () => {
    it('should set authState to LOADING', () => {
      const { initialAuthState } = fromAuth;
      const expected: fromAuth.AuthState = {
        user: null,
        authState: fromAuth.AuthUiState.LOADING,
        error: null,
      };
      const action = new LoginAction({ provider: 'test' });

      const state = fromAuth.authReducer(initialAuthState, action);

      expect(state).toEqual(expected);
    });
  });

  describe('LOGOUT action', () => {
    it('should set authState to LOADING', () => {
      const { initialAuthState } = fromAuth;
      const expected: fromAuth.AuthState = {
        user: null,
        authState: fromAuth.AuthUiState.LOADING,
        error: null,
      };
      const action = new LogoutAction();

      const state = fromAuth.authReducer(initialAuthState, action);

      expect(state).toEqual(expected);
    });
  });

  describe('AUTHENTICATED action', () => {
    it('should define user & set authState to AUTHENTICATED', () => {
      const { initialAuthState } = fromAuth;

      const expected: fromAuth.AuthState = {
        user: testUser,
        authState: fromAuth.AuthUiState.AUTHENTICATED,
        error: null,
      };
      const action = new AuthenticatedAction(testUser);

      const state = fromAuth.authReducer(initialAuthState, action);

      expect(state).toEqual(expected);
    });
  });

  describe('NOT_AUTHENTICATED action', () => {
    const expected: fromAuth.AuthState = {
      user: null,
      authState: fromAuth.AuthUiState.NOT_AUTHENTICATED,
      error: null,
    };

    it('should set authState to NOT_AUTHENTICATED', () => {
      const { initialAuthState } = fromAuth;
      const action = new NotAuthenticatedAction();

      const state = fromAuth.authReducer(initialAuthState, action);

      expect(state).toEqual(expected);
    });

    it('should clear user & error', () => {
      const initialAuthState: fromAuth.AuthState = {
        user: testUser,
        authState: fromAuth.AuthUiState.AUTHENTICATED,
        error: 'test error',
      };
      const action = new NotAuthenticatedAction();

      const state = fromAuth.authReducer(initialAuthState, action);

      expect(state).toEqual(expected);
    });
  });

  describe('AUTH_ERROR action', () => {
    const message = 'test error';
    const expected: fromAuth.AuthState = {
      user: null,
      authState: fromAuth.AuthUiState.NOT_AUTHENTICATED,
      error: message,
    };

    it('should set error message & set authState to NOT_AUTHENTICATED', () => {
      const { initialAuthState } = fromAuth;
      const action = new AuthErrorAction({ message });

      const state = fromAuth.authReducer(initialAuthState, action);

      expect(state).toEqual(expected);
    });

    it('should clear user', () => {
      const initialAuthState: fromAuth.AuthState = {
        user: testUser,
        authState: fromAuth.AuthUiState.AUTHENTICATED,
        error: null,
      };
      const action = new AuthErrorAction({ message });

      const state = fromAuth.authReducer(initialAuthState, action);

      expect(state).toEqual(expected);
    });
  });
});

describe('Auth Queries', () => {
  const testState: AppState = {
    auth: {
      user: testUser,
      authState: fromAuth.AuthUiState.AUTHENTICATED,
      error: null,
    },
  };

  describe('getUser', () => {
    it('should select user', () => {
      const expected = testState.auth.user;

      const actual = fromAuth.AuthQuery.getUser(testState);

      expect(actual).toEqual(expected);
    });
  });

  describe('getAuthState', () => {
    it('should select authState', () => {
      const expected = testState.auth.authState;

      const actual = fromAuth.AuthQuery.getAuthState(testState);

      expect(actual).toEqual(expected);
    });
  });

  describe('getError', () => {
    it('should select error', () => {
      const expected = testState.auth.error;

      const actual = fromAuth.AuthQuery.getError(testState);

      expect(actual).toEqual(expected);
    });
  });
});
