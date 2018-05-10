import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AppState } from '@app/state/app.reducer';
import {
  ScopingActionTypes,
  ValidateSessionAction,
  SessionVerfiedAction,
  SessionJoinErrorAction,
} from '@app/scoping/state/scoping.actions';
import { ScopingService } from '@app/scoping/services/scoping.service';
import { SessionValidation } from '@models/scoping-session';
import { ScopingQuery } from '@app/scoping/state/scoping.reducer';
import { RouterFacade } from '@app/state/router.facade';
import { GoAction } from '@app/state/router.actions';

@Injectable()
export class ScopingFacade {
  /*
     * Observable Store Queries
     */
  error$ = this.store.pipe(select(ScopingQuery.selectError));

  /*
     * Module-level Effects
     */

  @Effect()
  validateSession$ = this.actions$.pipe(
    ofType<ValidateSessionAction>(ScopingActionTypes.VALIDATE_SESSION),
    switchMap(action =>
      this.scopingSvc.validateSession(action.payload.sessionValidation).pipe(
        map(
          data =>
            new SessionVerfiedAction({
              sessionLink: action.payload.sessionValidation.sessionLink,
            })
        ),
        catchError(error => {
          return of(new SessionJoinErrorAction({ message: error.message }));
        })
      )
    )
  );

  @Effect()
  sessionVerified$ = this.actions$.pipe(
    ofType<SessionVerfiedAction>(ScopingActionTypes.SESSION_VERIFIED),
    switchMap(action =>
      of(new GoAction({ path: [`/scoping/${action.payload.sessionLink}`] }))
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private scopingSvc: ScopingService
  ) {}

  /*
     * Action Creators
     */
  validateSession(sessionValidation: SessionValidation) {
    this.store.dispatch(new ValidateSessionAction({ sessionValidation }));
  }
}
