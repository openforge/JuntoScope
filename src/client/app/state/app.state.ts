import { MetaReducer, ActionReducerMap, ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import {
  RouterState,
  routerReducer,
  initialRouterState,
} from './router.reducer';

export interface AppState {
  router: RouterState;
}

export const reducers: ActionReducerMap<Partial<AppState>> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = environment.production
  ? []
  : [storeFreeze];

export const initialState: AppState = {
  router: initialRouterState,
};
