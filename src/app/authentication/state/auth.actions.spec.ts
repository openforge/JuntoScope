import * as AuthActions from './auth.actions';
import { User } from '../../../models/user';

describe('Authentication Actions', () => {
  describe('GetUser Action', () => {
    it('should create action', () => {
      const action = new AuthActions.GetUserAction();

      expect(action.type).toEqual(AuthActions.AuthActionTypes.GET_USER);
    });
  });

  describe('AuthenticatedAction Action', () => {
    it('should create action', () => {
      const payload: User = { uid: 'testuid', displayName: 'testUser' };
      const action = new AuthActions.AuthenticatedAction(payload);

      expect(action.type).toEqual(AuthActions.AuthActionTypes.AUTHENTICATED);
      expect(action.payload).toEqual(payload);
    });
  });

  describe('NotAuthenticatedAction Action', () => {
    it('should create action', () => {
      const action = new AuthActions.NotAuthenticatedAction();

      expect(action.type).toEqual(
        AuthActions.AuthActionTypes.NOT_AUTHENTICATED
      );
    });
  });

  describe('LoginAction Action', () => {
    it('should create action', () => {
      const payload = { provider: 'testProvider' };
      const action = new AuthActions.LoginAction(payload);

      expect(action.type).toEqual(AuthActions.AuthActionTypes.LOGIN);
      expect(action.payload).toEqual(payload);
    });
  });

  describe('AuthErrorAction Action', () => {
    it('should create action', () => {
      const payload = { message: 'test error message' };
      const action = new AuthActions.AuthErrorAction(payload);

      expect(action.type).toEqual(AuthActions.AuthActionTypes.AUTH_ERROR);
      expect(action.payload).toEqual(payload);
    });
  });

  describe('LogoutAction Action', () => {
    it('should create action', () => {
      const action = new AuthActions.LogoutAction();

      expect(action.type).toEqual(AuthActions.AuthActionTypes.LOGOUT);
    });
  });
});
