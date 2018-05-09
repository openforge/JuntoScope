import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from 'angularfire2/firestore';

import { environment } from '@env/environment';
import { Connection } from '@models/connection';
import { AppFacade } from '@app/state/app.facade';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { Project } from '@models/project';

@Injectable()
export class ConnectionService {
  constructor(
    private appFacade: AppFacade,
    private afs: AngularFirestore,
    private http: HttpClient
  ) {}

  addConnection(connection: Connection) {
    return this.http.post(`${environment.apiBaseUrl}/connections`, connection);
  }

  getProjects(connection: Connection) {
    return this.http.get<{ projects: Project[] }>(
      `${environment.apiBaseUrl}/connections/${connection.id}/projects/`
    );
  }

  getConnections() {
    return this.appFacade.connectionsClnPath$.pipe(
      switchMap(clnPath => this.afs.collection(clnPath).stateChanges())
    );
  }
}
