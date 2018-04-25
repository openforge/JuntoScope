import {
  MetaReducer,
  ActionReducerMap,
  ActionReducer,
  createSelector,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@env/environment';
import {
  RouterState,
  routerReducer,
  initialRouterState,
  RouterQuery,
} from '@app/state/router.reducer';
import { NavigationOptions } from '@app/state/router.actions';
import {
  AuthState,
  AuthQuery,
  AuthUiState,
} from '@app/authentication/state/auth.reducer';
import {
  ConnectionState,
  ConnectionQuery,
  ConnectionUiState,
} from '@app/connections/state/connection.reducer';

interface FullAppState {
  router: RouterState;
  auth: AuthState;
  connection: ConnectionState;
}

export type AppState = Partial<FullAppState>;

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = environment.production
  ? []
  : [storeFreeze];

export const initialState: AppState = {
  router: initialRouterState,
};

export namespace AppQuery {
  export const selectAuthRedirect = createSelector(
    AuthQuery.selectUiState,
    RouterQuery.getQueryParams,
    (authUiState, routeQueryParams): NavigationOptions => {
      if (authUiState === AuthUiState.NOT_AUTHENTICATED) {
        return { path: ['/login'] };
      }

      return { path: ['/connections'] };
    }
  );

  export const selectUidDocPath = createSelector(
    AuthQuery.selectUser,
    user => user && `users/${user.uid}`
  );
  export const selectConnectionsClnPath = createSelector(
    selectUidDocPath,
    uidPath => uidPath && `${uidPath}/connections`
  );
}
