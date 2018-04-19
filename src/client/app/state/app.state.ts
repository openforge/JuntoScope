import { MetaReducer, ActionReducerMap, ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@env/environment';
import {
  RouterState,
  routerReducer,
  initialRouterState,
} from '@app/state/router.reducer';
import { AuthState } from '@app/authentication/state/auth.reducer';
import { ConnectionsState } from '../connections/state/connections.reducer';

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
