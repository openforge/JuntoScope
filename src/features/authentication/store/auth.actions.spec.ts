import * as AuthActions from "@app/authentication/state/auth.actions";
import { User } from "@models/user";

describe("Authentication Actions", () => {
  describe("GetUser Action", () => {
    it("should create action", () => {
      const action = new AuthActions.GetUserAction();

      expect(action).toEqual({ type: AuthActions.AuthActionTypes.GET_USER });
    });
  });

  describe("AuthenticatedAction Action", () => {
    it("should create action", () => {
      const payload: User = { uid: "testuid", displayName: "testUser" };
      const action = new AuthActions.AuthenticatedAction(payload);

      expect(action).toEqual({
        type: AuthActions.AuthActionTypes.AUTHENTICATED,
        payload
      });
    });
  });

  describe("NotAuthenticatedAction Action", () => {
    it("should create action", () => {
      const action = new AuthActions.NotAuthenticatedAction();

      expect(action).toEqual({
        type: AuthActions.AuthActionTypes.NOT_AUTHENTICATED
      });
    });
  });

  describe("LoginAction Action", () => {
    it("should create action", () => {
      const payload = { provider: "testProvider" };
      const action = new AuthActions.LoginAction(payload);

      expect(action).toEqual({
        type: AuthActions.AuthActionTypes.LOGIN,
        payload
      });
    });
  });

  describe("AuthErrorAction Action", () => {
    it("should create action", () => {
      const payload = { message: "test error message" };
      const action = new AuthActions.AuthErrorAction(payload);

      expect(action).toEqual({
        type: AuthActions.AuthActionTypes.AUTH_ERROR,
        payload
      });
    });
  });

  describe("LogoutAction Action", () => {
    it("should create action", () => {
      const action = new AuthActions.LogoutAction();

      expect(action).toEqual({ type: AuthActions.AuthActionTypes.LOGOUT });
    });
  });
});
