import { MetaReducer, ActionReducerMap, createSelector } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";
import { environment } from "../environment";
import { NavigationOptions } from "./router.actions";
import {
  AuthState,
  AuthQuery,
  AuthUiState
} from "../features/authentication/store/auth.reducer";
import {
  ConnectionState,
  connectionReducer,
  initialConnectionState
} from "../features/connections/store/connection.reducer";
import {
  DashboardState,
  dashboardReducer,
  initialDashboardState
} from "../features/dashboard/store/dashboard.reducer";

interface FullAppState {
  auth: AuthState;
  connection: ConnectionState;
  dashboard: DashboardState;
}

export type AppState = Partial<FullAppState>;

export const reducers: ActionReducerMap<AppState> = {
  connection: connectionReducer,
  dashboard: dashboardReducer
};

export const metaReducers: MetaReducer<AppState>[] = environment.production
  ? []
  : [storeFreeze];

export const initialState: AppState = {
  connection: initialConnectionState,
  dashboard: initialDashboardState
};

export namespace AppQuery {
  export const selectUid = createSelector(
    AuthQuery.selectUser,
    user => (user ? user.uid : null)
  );

  export const selectAuthRedirect = createSelector(
    AuthQuery.selectUiState,
    (authUiState): NavigationOptions => {
      if (authUiState === AuthUiState.NOT_AUTHENTICATED) {
        return { path: ["LoginPage"] };
      }

      return { path: ["DashboardPage"] };
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
