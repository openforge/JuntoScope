import {
  MetaReducer,
  ActionReducerMap,
  ActionReducer,
  createSelector,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import {
  RouterState,
  routerReducer,
  initialRouterState,
  RouterQuery,
} from './router.reducer';
import { NavigationOptions } from './router.actions';
import {
  AuthState,
  AuthQuery,
  AuthUiState,
} from '../authentication/state/auth.reducer';
import {
  ConnectionState,
  ConnectionQuery,
  ConnectionUiState,
} from '../connections/state/connection.reducer';
import { ScopingState, ScopingQuery } from '../scoping/state/scoping.reducer';
import { DashboardState } from '../dashboard/state/dashboard.reducer';

interface FullAppState {
  router: RouterState;
  auth: AuthState;
  connection: ConnectionState;
  scoping: ScopingState;
  dashboard: DashboardState;
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
  export const selectUid = createSelector(
    AuthQuery.selectUser,
    user => user.uid
  );

  export const selectAuthRedirect = createSelector(
    AuthQuery.selectUiState,
    RouterQuery.getQueryParams,
    (authUiState, routeQueryParams): NavigationOptions => {
      if (authUiState === AuthUiState.NOT_AUTHENTICATED) {
        return { path: ['/login'] };
      }

      return { path: ['/dashboard'] };
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
  export const selectPublicSessionsClnPath = 'public/data/sessions';
}
