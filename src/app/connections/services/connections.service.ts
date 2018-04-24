import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';
import { Connection } from '@models/connection';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';

import * as firebase from 'firebase';

@Injectable()
export class ConnectionsService {
  private connectionsCollection: AngularFirestoreCollection<Connection>;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.connectionsCollection = afs.collection<Connection>('connections');
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

  addConnection(connection: Connection) {
    // TODO Add cloud function url
    return this.http.post('', connection);
  }
}
