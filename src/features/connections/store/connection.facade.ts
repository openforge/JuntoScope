import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import {
  switchMap,
  catchError,
  map,
  mergeMap,
  tap,
  take,
  filter,
  exhaustMap
} from "rxjs/operators";
import { of } from "rxjs";
import { AppState } from "../../../store/app.reducer";
import {
  ConnectionActionTypes,
  QueryConnectionsAction,
  AddedConnectionAction,
  ModifiedConnectionAction,
  RemovedConnectionAction,
  RemoveConnectionAction,
  AddConnectionAction,
  SelectedConnectionAction,
  SelectedProjectAction,
  AddConnectionErrorAction,
  NoConnectionsAction,
  CreateSessionAction,
  AddConnectionSuccessAction,
  ClearErrorAction,
  ClearConnectionsAction
} from "./connection.actions";
import { ConnectionService } from "../services/connection.service";
import { Connection } from "../../../models/connection";
import { ConnectionQuery, ConnectionUiState } from "./connection.reducer";
import { NoopAction } from "../../../store/app.actions";
import { PopupService } from "../../../shared/popup.service";
import { VerifyModalComponent } from "../components/verify-modal/verify-modal.component";
import { ShareScopeLinkModalComponent } from "../components/share-scope-link-modal/share-scope-link-modal.component";
import { LoadingService } from "../../../shared/loading.service";

@Injectable()
export class ConnectionFacade {
  /*
   * Observable Store Queries
   */
  connections$ = this.store.pipe(select(ConnectionQuery.selectAll));

  uiState$ = this.store.pipe(select(ConnectionQuery.selectUiState));

  error$ = this.store.pipe(select(ConnectionQuery.selectError));

  selectedConnection$ = this.store.pipe(
    select(ConnectionQuery.selectSelectedConnection)
  );

  selectedProject$ = this.store.pipe(select(ConnectionQuery.selectProject));

  /*
   * Module-level Effects
   */
  @Effect()
  loadConnections$ = this.actions$.pipe(
    ofType<QueryConnectionsAction>(ConnectionActionTypes.QUERY_ALL),
    switchMap(() => this.connectionSvc.getConnections()),
    tap(changeActions => {
      if (!changeActions.length) {
        this.store.dispatch(new NoConnectionsAction());
      }
    }),
    mergeMap(changeActions => changeActions),
    map(change => {
      const id = change.payload.doc.id;
      const data: any = change.payload.doc.data();
      const connection: Connection = { id, ...data };

      switch (change.type) {
        case "added":
          return new AddedConnectionAction({ connection });

        case "modified":
          const changes = connection;
          return new ModifiedConnectionAction({ update: { id, changes } });

        case "removed":
          return new RemovedConnectionAction({ connectionId: id });
      }
    })
  );

  @Effect()
  addConnection$ = this.actions$.pipe(
    ofType<AddConnectionAction>(ConnectionActionTypes.ADD),
    switchMap(action =>
      this.connectionSvc.addConnection(action.payload.connection).pipe(
        switchMap((response: any) =>
          this.popupSvc.openModal({
            component: VerifyModalComponent,
            componentProps: { connectionData: response }
          })
        ),
        map(() => new AddConnectionSuccessAction()),
        catchError(error => {
          this.popupSvc.simpleAlert("Uh Oh!", error.message, "OK");
          return of(new AddConnectionErrorAction({ message: error.message }));
        })
      )
    )
  );

  @Effect()
  deleteConnection$ = this.actions$.pipe(
    ofType<RemoveConnectionAction>(ConnectionActionTypes.REMOVE),
    switchMap(action => {
      return this.connectionSvc
        .deleteConnection(action.payload.connectionId)
        .pipe(
          map(
            () =>
              new RemovedConnectionAction({
                connectionId: action.payload.connectionId
              })
          )
        );
    })
  );

  @Effect()
  selectConnection$ = this.actions$.pipe(
    ofType<SelectedConnectionAction>(ConnectionActionTypes.SELECTED),
    switchMap(action =>
      this.connectionSvc.getProjects(action.payload.connectionId).pipe(
        map(
          projects =>
            new ModifiedConnectionAction({
              update: {
                id: action.payload.connectionId,
                changes: { projects }
              }
            })
        )
      )
    )
  );

  @Effect()
  selectProject$ = this.actions$.pipe(
    ofType<SelectedProjectAction>(ConnectionActionTypes.SELECTED_PROJECT),
    switchMap(action =>
      this.connectionSvc
        .getTaskLists(action.payload.connection.id, action.payload.project.id)
        .pipe(
          map(taskLists => {
            const updatedProject = { ...action.payload.project, taskLists };
            const projectsChanges = {
              ...action.payload.connection.projects,
              [action.payload.project.id]: updatedProject
            };
            return new ModifiedConnectionAction({
              update: {
                id: action.payload.connection.id,
                changes: {
                  projects: projectsChanges
                }
              }
            });
          })
        )
    )
  );

  @Effect({ dispatch: false })
  createSession$ = this.actions$.pipe(
    ofType<CreateSessionAction>(ConnectionActionTypes.CREATE_SESSION),
    exhaustMap(action =>
      this.connectionSvc
        .createSession(
          action.payload.connectionId,
          action.payload.projectId,
          action.payload.taskListIds,
          action.payload.projectName
        )
        .pipe(
          tap(response => {
            // There's gotta be a better way to do this
            let connectionName;
            this.selectedConnection$
              .subscribe(connection => {
                connectionName =
                  connection.externalData.company + " - " + connection.type;
              })
              .unsubscribe();

            // There's gotta be a better way to do this
            let projectName;
            this.selectedProject$
              .subscribe(project => {
                projectName = project.name;
              })
              .unsubscribe();

            this.popupSvc.openModal({
              component: ShareScopeLinkModalComponent,
              componentProps: {
                connectionName: connectionName,
                projectName: projectName,
                sessionUrl: response.sessionCode,
                accessCode: response.accessCode
              }
            });
          }),
          catchError(error => {
            console.log("error: ", error);
            this.loadingSvc.dismiss();
            this.popupSvc.simpleAlert("Oops!", error.message, "Ok");
            return of(error.message);
          })
        )
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private connectionSvc: ConnectionService,
    private popupSvc: PopupService,
    private loadingSvc: LoadingService
  ) {}

  /*
   * Action Creators
   */
  getConnections() {
    this.store.dispatch(new QueryConnectionsAction());
  }

  clearConnections() {
    this.store.dispatch(new ClearConnectionsAction());
  }

  addConnection(connection: Connection) {
    this.store.dispatch(new AddConnectionAction({ connection }));
  }

  removeConnection(connectionId: string) {
    this.store.dispatch(new RemoveConnectionAction({ connectionId }));
  }

  selectConnection(connectionId: string) {
    this.uiState$
      .pipe(
        take(1),
        switchMap(currentState => {
          if (currentState === ConnectionUiState.LOADED) {
            return of(currentState);
          } else if (currentState !== ConnectionUiState.LOADING) {
            this.getConnections();

            return this.uiState$.pipe(
              filter(state => state === ConnectionUiState.LOADED),
              take(1)
            );
          }
        })
      )
      .subscribe(() => {
        if (connectionId) {
          this.store.dispatch(new SelectedConnectionAction({ connectionId }));
        }
      });
  }

  selectProject(connectionId: string, projectId: string) {
    this.selectedConnection$
      .pipe(
        tap(connection => {
          if (!connection || connection.id !== connectionId) {
            this.selectConnection(connectionId);
          }
        }),
        filter(
          connection =>
            connection &&
            connection.id === connectionId &&
            connection.projects &&
            !!connection.projects[projectId]
        ),
        take(1)
      )
      .subscribe(connection => {
        this.store.dispatch(
          new SelectedProjectAction({
            connection,
            project: connection.projects[projectId]
          })
        );
      });
  }

  createSession(
    connectionId: string,
    projectId: string,
    taskListIds: string[],
    projectName: string
  ) {
    this.store.dispatch(
      new CreateSessionAction({
        connectionId,
        projectId,
        taskListIds,
        projectName
      })
    );
  }

  clearError() {
    this.store.dispatch(new ClearErrorAction());
  }
}
