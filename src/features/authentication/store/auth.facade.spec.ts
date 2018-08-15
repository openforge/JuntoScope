import { async, fakeAsync, tick } from "@angular/core/testing";

import { StoreModule, Store, Action } from "@ngrx/store";
import {
  EffectsMetadata,
  getEffectsMetadata,
  EffectsModule
} from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";

import { Observable } from "rxjs/Observable";

import { cold, hot } from "jest-marbles";
import { ConfigureFn, configureTests } from "../../../test/jest-test.helper";
import { AuthState, authReducer, initialAuthState } from "./auth.reducer";
import { AuthFacade } from "./auth.facade";
import {
  AuthActionTypes,
  GetUserAction,
  AuthErrorAction,
  NotAuthenticatedAction,
  AuthenticatedAction,
  LoginAction,
  LogoutAction
} from "./auth.actions";
import { AuthService } from "../services/auth.service";
import { User } from "../../../models/user";

const testUser: User = { uid: "testUid", displayName: "testName" };

class MockAuthService {
  getUser() {
    return cold("n-u--n--u---n", { n: null, u: testUser });
  }
  login() {
    return Promise.resolve();
  }
  logout() {
    return Promise.resolve();
  }
}

describe("AuthEffects", () => {
  let store: Store<AuthState>;
  let actions$: Observable<Action>;
  let service: AuthService;
  let facade: AuthFacade;
  let metadata: EffectsMetadata<AuthFacade>;

  beforeEach(
    async(() => {
      const configure: ConfigureFn = testBed => {
        testBed.configureTestingModule({
          imports: [
            StoreModule.forRoot(
              { auth: authReducer },
              { initialState: { auth: initialAuthState } }
            ),
            EffectsModule.forRoot([AuthFacade])
          ],
          providers: [
            {
              provide: AuthService,
              useClass: MockAuthService
            },
            AuthFacade,
            provideMockActions(() => actions$)
          ]
        });
      };

      configureTests(configure).then(testBed => {
        store = testBed.get(Store);
        service = testBed.get(AuthService);
        facade = testBed.get(AuthFacade);
        metadata = getEffectsMetadata(facade);
      });
    })
  );

  describe("Effect: getUser$", () => {
    it("should dispatch another action", () => {
      expect(metadata.login$).toEqual({ dispatch: true });
    });

    it("should call AuthService#getUser", () => {
      const passThrough = service.getUser;
      jest.spyOn(service, "getUser").mockImplementation(() => passThrough());

      const a = new GetUserAction();
      actions$ = hot("--a-", { a });

      facade.getUser$.subscribe(() => {
        expect(service.getUser).toHaveBeenCalled();
      });
    });

    it("should dispatch NotAuthenticatedAction when not authenticated", () => {
      jest
        .spyOn(service, "getUser")
        .mockImplementation(() => cold("u-", { u: null }));
      const f = new NotAuthenticatedAction();
      const expected = cold("--f-", { f });

      const a = new GetUserAction();
      actions$ = hot("--a-", { a });

      expect(facade.getUser$).toBeObservable(expected);
    });

    it("should dispatch AuthenticatedAction when authenticated", () => {
      const f = new AuthenticatedAction(testUser);
      const expected = cold("--f-", { f });
      jest
        .spyOn(service, "getUser")
        .mockImplementation(() => cold("u-", { u: testUser }));

      const a = new GetUserAction();
      actions$ = hot("--a-", { a });

      expect(facade.getUser$).toBeObservable(expected);
    });

    it("should observe authState & dispatch", () => {
      const f = new NotAuthenticatedAction();
      const s = new AuthenticatedAction(testUser);
      const expected = cold("--f-s--f--s---f", { f, s });

      const a = new GetUserAction();
      actions$ = hot("--a-", { a });

      expect(facade.getUser$).toBeObservable(expected);
    });

    it("should dispatch AuthErrorAction on error", () => {
      const message = "test error";
      const e = new AuthErrorAction({ message });
      const expected = cold("--(e|)", { e });
      jest.spyOn(service, "getUser").mockImplementation(() => {
        throw Error(message);
      });

      const a = new GetUserAction();
      actions$ = hot("--a-", { a });

      expect(facade.getUser$).toBeObservable(expected);
    });
  });

  describe("Effect: login$", () => {
    it("should dispatch another action", () => {
      expect(metadata.login$).toEqual({ dispatch: true });
    });

    it("should call AuthService#login", () => {
      const passThrough = service.login;
      jest.spyOn(service, "login").mockImplementation(() => passThrough("")); // Might fail

      const a = new LoginAction({ provider: "google" });
      actions$ = hot("--a-", { a });

      facade.login$.subscribe(() => {
        expect(service.login).toHaveBeenCalled();
      });
    });

    it("should dispatch GetUserAction on login success", () => {
      const s = new GetUserAction();
      const expected = cold("--s-", { s });

      const a = new LoginAction({ provider: "google" });
      actions$ = hot("--a-", { a });

      facade.login$.subscribe(action => {
        expect(action instanceof GetUserAction).toBe(true);
      });
    });

    it("should dispatch AuthErrorAction on error", () => {
      const message = "test error";
      const e = new AuthErrorAction({ message });
      const expected = cold("--(e|)", { e });
      jest.spyOn(service, "login").mockImplementation(() => {
        throw Error(message);
      });

      const a = new LoginAction({ provider: "error" });
      actions$ = hot("--a-", { a });

      expect(facade.login$).toBeObservable(expected);
    });
  });

  describe("Effect: logout$", () => {
    it("should not dispatch another action", () => {
      expect(metadata.logout$).toEqual({ dispatch: false });
    });

    it("should call AuthService#logout", () => {
      jest.spyOn(service, "logout").mockImplementation(service.logout);

      const a = new LogoutAction();
      actions$ = hot("--a-", { a });

      facade.logout$.subscribe(() => {
        expect(service.logout).toHaveBeenCalled();
      });
    });
  });

  describe("Action Creator: checkAuth", () => {
    it("should dispatch GetUserAction", () => {
      let dispatchedAction: Action;
      jest
        .spyOn(store, "dispatch")
        .mockImplementation(action => (dispatchedAction = action));

      facade.checkAuth(); // .subscribe()

      expect(dispatchedAction.type).toBe(AuthActionTypes.GET_USER);
    });
  });

  describe("Action Creator: googleLogin", () => {
    it("should dispatch LoginAction", () => {
      let dispatchedAction: Action;
      jest
        .spyOn(store, "dispatch")
        .mockImplementation(action => (dispatchedAction = action));

      facade.googleLogin();

      expect(dispatchedAction).toEqual({
        type: AuthActionTypes.LOGIN,
        payload: { provider: "google" }
      });
    });
  });

  describe("Action Creator: logout", () => {
    it("should dispatch LogoutAction", () => {
      let dispatchedAction: Action;
      jest
        .spyOn(store, "dispatch")
        .mockImplementation(action => (dispatchedAction = action));

      facade.logout();

      expect(dispatchedAction.type).toBe(AuthActionTypes.LOGOUT);
    });
  });
});
