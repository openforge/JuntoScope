import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AngularFirestore } from "angularfire2/firestore";

import { switchMap, map, takeUntil, filter } from "rxjs/operators";

import * as _ from "lodash";

import { environment } from "../../../environment";
import { Project } from "../../../models/project";
import { TaskList } from "../../../models/task-list";
import { Connection } from "../../../models/connection";
import { AppEffects } from "../../../store/app.effects";
import { AuthEffects } from "../../authentication/store/auth.effects";
import { AuthUiState } from "../../authentication/store/auth.reducer";

@Injectable()
export class ConnectionService {
  authState$ = this.authFacade.uiState$;

  constructor(
    private appFacade: AppEffects,
    private afs: AngularFirestore,
    private http: HttpClient,
    private authFacade: AuthEffects
  ) {}

  addConnection(connection: Connection) {
    return this.http.post(`${environment.apiBaseUrl}/connections`, connection);
  }

  deleteConnection(connectionId: string) {
    return this.http.delete(
      `${environment.apiBaseUrl}/connections/${connectionId}`
    );
  }

  getProjects(connectionId: string) {
    return this.http
      .get<{ projects: Project[] }>(
        `${environment.apiBaseUrl}/connections/${connectionId}/projects/`
      )
      .pipe(map(response => _.keyBy(response.projects, "id")));
  }

  getTaskLists(connectionId: string, projectId: string) {
    console.log("getting the task lists");
    return this.http
      .get<{ taskLists: TaskList[] }>(
        `${
          environment.apiBaseUrl
        }/connections/${connectionId}/projects/${projectId}/taskLists`
      )
      .pipe(map(response => _.keyBy(response.taskLists, "id")));
  }

  getConnections() {
    const userLogout$ = this.authState$.pipe(
      filter(authState => {
        return authState === AuthUiState.NOT_AUTHENTICATED;
      })
    );

    return this.appFacade.connectionsClnPath$.pipe(
      switchMap(clnPath => this.afs.collection(clnPath).stateChanges()),
      takeUntil(userLogout$)
    );
  }

  createSession(
    connectionId: string,
    projectId: string,
    taskListIds: string[],
    projectName: string
  ) {
    return this.http.post<{ sessionCode: string; accessCode: string }>(
      `${
        environment.apiBaseUrl
      }/connections/${connectionId}/projects/${projectId}/sessions/${projectName}`,
      { taskListIds }
    );
  }
}
