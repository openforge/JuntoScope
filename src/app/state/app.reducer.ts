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
import { ConnectionsState } from '@app/connections/state/connections.reducer';

interface FullAppState {
  router: RouterState;
  auth: AuthState;
  connections: ConnectionsState;
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

}
