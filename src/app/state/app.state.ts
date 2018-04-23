import { MetaReducer, ActionReducerMap, ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import {
  RouterState,
  routerReducer,
  initialRouterState,
} from './router.reducer';
import { AuthState } from '../authentication/state/auth.reducer';

interface FullAppState {
  router: RouterState;
  auth: AuthState;
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
