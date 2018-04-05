import { Params, RouterStateSnapshot } from '@angular/router';

import { createSelector } from '@ngrx/store';
import { RouterStateSerializer, RouterReducerState } from '@ngrx/router-store';

import { AppState } from './app.state';

interface SerializedRouterState {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer
  implements RouterStateSerializer<SerializedRouterState> {
  serialize(snapshot: RouterStateSnapshot): SerializedRouterState {
    const { url, root: { queryParams } } = snapshot;
    let { root: route } = snapshot;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { params } = route;

    return { url, params, queryParams };
  }
}

export type RouterState = RouterReducerState<SerializedRouterState>;

export const initialRouterState: RouterState = {
  state: { url: null, params: null, queryParams: null },
  navigationId: 0,
};

export { routerReducer } from '@ngrx/router-store';

export namespace RouterQuery {
  const getSlice = (state: AppState) => state.router;
  export const getState = createSelector(getSlice, state => state.state);
  export const getUrl = createSelector(getState, state => state.url);
  export const getParams = createSelector(getState, state => state.params);
  export const getQueryParams = createSelector(
    getState,
    state => state.queryParams
  );
}
