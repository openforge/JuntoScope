import {
  MetaReducer,
  ActionReducerMap,
  ActionReducer,
  createSelector
} from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";

import { environment } from "../environment";
// import {
//   RouterState,
//   routerReducer,
//   initialRouterState,
//   RouterQuery
// } from "./router.reducer";
import { NavigationOptions } from "./router.actions";
import {
  AuthState,
  AuthQuery,
  AuthUiState,
  authReducer
} from "../features/authentication/store/auth.reducer";
import {
  ConnectionState,
  ConnectionQuery,
  ConnectionUiState,
  connectionReducer,
  initialConnectionState
} from "../features/connections/store/connection.reducer";
// import { ScopingState, ScopingQuery } from '@app/scoping/state/scoping.reducer';
import {
  DashboardState,
  dashboardReducer,
  initialDashboardState
} from "../features/dashboard/store/dashboard.reducer";

interface FullAppState {
  // router: RouterState;
  auth: AuthState;
  connection: ConnectionState;
  // scoping: ScopingState;
  dashboard: DashboardState;
}

export type AppState = Partial<FullAppState>;

export const reducers: ActionReducerMap<AppState> = {
  // router: routerReducer
  // auth: authReducer,
  connection: connectionReducer,
  dashboard: dashboardReducer
};

export const metaReducers: MetaReducer<AppState>[] = environment.production
  ? []
  : [storeFreeze];

export const initialState: AppState = {
  // router: initialRouterState
  connection: initialConnectionState,
  dashboard: initialDashboardState
};

export namespace AppQuery {
  export const selectUid = createSelector(
    AuthQuery.selectUser,
    user => user ? user.uid: null 
  );

  export const selectAuthRedirect = createSelector(
    AuthQuery.selectUiState,
    (authUiState): NavigationOptions => {
      if (authUiState === AuthUiState.NOT_AUTHENTICATED) {
        return { path: ["LoginPage"] };
      }

      return { path: ["DashboardComponent"] };
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
  export const selectPublicSessionsClnPath = "public/data/sessions";
}
