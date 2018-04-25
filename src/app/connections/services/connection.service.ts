import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from 'angularfire2/firestore';

import { environment } from '@env/environment';
import { Connection } from '@models/connection';

@Injectable()
export class ConnectionService {
  constructor(private afs: AngularFirestore, private http: HttpClient) {}

  addConnection(connection: Connection) {
    return this.http.post(`${environment.apiBaseUrl}/connections`, connection);
  }

  getConnections(user) {
    return this.afs
      .collection('connections', ref => ref.where('uid', '==', user.uid))
      .snapshotChanges()
      .map(connections => {
        return connections.map(a => {
          const data = a.payload.doc.data() as Connection;
          const id = a.payload.doc.id;
          return Object.assign({}, { id }, data);
        });
      });
  }
}
