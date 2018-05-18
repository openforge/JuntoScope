import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { AppState, AppQuery } from '@app/state/app.reducer';
import { filter } from 'rxjs/operators';

@Injectable()
export class AppFacade {
  /*
   * Observable Store Queries
   */

  authRedirect$ = this.store.pipe(select(AppQuery.selectAuthRedirect));

  uid$ = this.store.pipe(
    select(AppQuery.selectUid),
    filter(exists => !!exists)
  );

  uidDocPath$ = this.store.pipe(
    select(AppQuery.selectUidDocPath),
    filter(exists => !!exists)
  );

  connectionsClnPath$ = this.store.pipe(
    select(AppQuery.selectConnectionsClnPath),
    filter(exists => !!exists)
  );

  /*
   * Module-level Effects
   */

  constructor(private store: Store<AppState>) {}

  /*
   * Action Creators
   */
}
