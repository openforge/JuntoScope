import { Params, RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer, RouterReducerState } from "@ngrx/router-store";

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
  navigationId: 0
};

export { routerReducer } from "@ngrx/router-store";
