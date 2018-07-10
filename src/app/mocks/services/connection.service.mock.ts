import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class ConnectionServiceMock {
  addConnection(connection: string) {
    return Observable.of(`${environment.apiBaseUrl}/connections`, connection);
  }

  getProjects(connectionId: string) {
    return Observable.of(
      `${environment.apiBaseUrl}/connections/${connectionId}/projects/`
    );
  }

  getTaskLists(connectionId: string, projectId: string) {
    return Observable.of(
      `${
        environment.apiBaseUrl
      }/connections/${connectionId}/projects/${projectId}/taskLists`
    );
  }

  createSession(connectionId, projectId, taskListIds) {
    return Observable.of(
      `${
        environment.apiBaseUrl
      }/connections/${connectionId}/projects/${projectId}/sessions`,
      { taskListIds }
    );
  }

  getConnections() {
    return Observable.of('');
  }
}
