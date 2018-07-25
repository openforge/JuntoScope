import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";

import {
  switchMap,
  catchError,
  map,
  mergeMap,
  tap,
  mergeAll
} from "rxjs/operators";
import { of, merge, forkJoin, concat } from "rxjs";

import { AppState } from "../../../store/app.reducer";
import {
  LoadHistoryItemsAction,
  LoadMoreHistoryItemsAction,
  DashboardActionTypes,
  AddedHistoryItemAction,
  ModifiedHistoryItemAction,
  RemovedHistoryItemAction,
  NoHistoryItemsAction,
  DeleteSessionAction,
  DeleteSessionErrorAction,
  RefreshAccessCodeAction,
  RefreshAccessCodeErrorAction
} from "./dashboard.actions";
import { HistoryService } from "../services/history.service";
import { HistoryItem } from "../../../models/history-item";
import { DashboardQuery } from "./dashboard.reducer";
import { NoopAction } from "../../../store/app.actions";
import { DocumentChangeAction } from "angularfire2/firestore";
import { ScopingSession } from "../../../models/scoping-session";

@Injectable()
export class DashboardEffects {
  historyItems$ = this.store.pipe(select(DashboardQuery.selectAll));

  uiState$ = this.store.pipe(select(DashboardQuery.selectUiState));

  @Effect()
  loadHistoryItems = this.actions$.pipe(
    ofType<LoadHistoryItemsAction | LoadMoreHistoryItemsAction>(
      DashboardActionTypes.LOAD_HISTORY,
      DashboardActionTypes.LOAD_MORE_HISTORY
    ),
    switchMap(action => {
      if (
        action.type === DashboardActionTypes.LOAD_HISTORY ||
        action.type === DashboardActionTypes.LOAD_MORE_HISTORY
      ) {
        return this.historySvc.loadHistoryItems().pipe(
          tap(changeActions => {
            if (!changeActions.length) {
              this.store.dispatch(new NoHistoryItemsAction());
            }
          })
        );
      }
    }),
    mergeMap(changeActions =>
      merge(
        of(changeActions),
        concat(
          changeActions.map(changeAction => {
            if (changeAction.type !== "removed") {
              const historyItem = itemFromChangeAction(changeAction);
              return this.historySvc
                .getSession(historyItem)
                .pipe(map(toChangeAction(historyItem)));
            }
          })
        )
      )
    ),
    mergeAll(),
    map(change => {
      const id = change.payload.doc.id;
      const data: any = change.payload.doc.data();
      const historyItem: HistoryItem = { id, ...data };

      switch (change.type) {
        case "added":
          return new AddedHistoryItemAction({ historyItem });

        case "modified":
          const changes = historyItem;
          return new ModifiedHistoryItemAction({ update: { id, changes } });

        case "removed":
          return new RemovedHistoryItemAction({
            historyItemId: historyItem.sessionId
          });
      }
    })
  );

  @Effect()
  deleteSession$ = this.actions$.pipe(
    ofType<DeleteSessionAction>(DashboardActionTypes.DELETE_SESSION),
    switchMap(action =>
      this.historySvc.deleteSession(action.sessionLink).pipe(
        map(
          () =>
            new RemovedHistoryItemAction({
              historyItemId: action.sessionLink
            })
        ),
        map(() => new LoadHistoryItemsAction()),
        catchError(error =>
          of(new DeleteSessionErrorAction({ message: error.message }))
        )
      )
    )
  );

  @Effect()
  refreshAccessCode$ = this.actions$.pipe(
    ofType<RefreshAccessCodeAction>(DashboardActionTypes.REFRESH_ACCESS_CODE),
    switchMap(action =>
      this.historySvc.refreshAccessCode(action.sessionCode).pipe(
        map(() => new NoopAction()),
        catchError(error =>
          of(new RefreshAccessCodeErrorAction({ message: error.message }))
        )
      )
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private historySvc: HistoryService
  ) {}

  getHistory() {
    this.store.dispatch(new LoadHistoryItemsAction());
  }

  getMoreHistory() {
    this.store.dispatch(new LoadMoreHistoryItemsAction());
  }
}

const itemFromChangeAction = (
  change: DocumentChangeAction
): Partial<HistoryItem> => {
  const id = change.payload.doc.id;
  const data = change.payload.doc.data();
  return { id, ...data };
};

const toChangeAction = (data: Partial<HistoryItem>) => (
  session: ScopingSession
) => ({
  type: "modified",
  payload: {
    doc: {
      id: data.id,
      data() {
        return {
          sessionId: data.sessionId,
          ...session
        };
      }
    }
  }
});
