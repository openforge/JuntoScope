import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { AppState, AppQuery } from '@app/state/app.reducer';

@Injectable()
export class AppFacade {
  /*
   * Observable Store Queries
   */

  authRedirect$ = this.store.pipe(select(AppQuery.selectAuthRedirect));
  /*
   * Module-level Effects
   */

  constructor(private store: Store<AppState>) {}

  /*
   * Action Creators
   */
}
