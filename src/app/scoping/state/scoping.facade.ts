import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';

import {
  switchMap,
  catchError,
  map,
  tap,
  exhaustMap,
  take,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { AppState } from '@app/state/app.reducer';
import { ScopingService } from '@app/scoping/services/scoping.service';
import { Task } from '@models/task';
import {
  VoteAction,
  VoteSuccessAction,
  VoteErrorAction,
  ScopingActionTypes,
  ValidateSessionAction,
  SessionVerfiedAction,
  SessionJoinErrorAction,
  ValidateParticipantAction,
  ParticipantValidatedAction,
  ValidateParticipantErrorAction,
} from '@app/scoping/state/scoping.actions';
import { ScopingService } from '@app/scoping/services/scoping.service';
import { SessionValidation } from '@models/scoping-session';
import { ScopingQuery } from '@app/scoping/state/scoping.reducer';
import { GoAction } from '@app/state/router.actions';

@Injectable()
export class ScopingFacade {
  /*
     * Observable Store Queries
     */
  error$ = this.store.pipe(select(ScopingQuery.selectError));
  uiState$ = this.store.pipe(select(ScopingQuery.selectUiState));

  /*
     * Module-level Effects
     */

  @Effect()
  vote$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.VOTE),
    switchMap(action =>
      this.scopingSvc
        .vote(action.payload)
        .then(() => {
          console.log('Vote saved successfully');
          return new VoteSuccessAction(action.payload);
        })
        .catch(({ message }) => {
          console.log('ERROR saving vote');
          return new VoteErrorAction({ message });
        })
    ),
    catchError(error => of(new VoteErrorAction({ message: error.message })))
  );

  @Effect()
  voteSuccess$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.VOTE_SUCCESS),
    take(1),
    tap(action => {
      const sessionId = action.payload.sessionId;
      this.routerFacade.navigate({ path: [`/scoping/${sessionId}/results`] });
    })
  );

  @Effect()
  validateParticipant$ = this.actions$.pipe(
    ofType<ValidateParticipantAction>(ScopingActionTypes.VALIDATE_PARTICIPANT),
    switchMap(action =>
      this.scopingSvc
        .checkParticipant(action.payload.uid, action.payload.sessionLink)
        .pipe(
          map(valid => {
            if (valid) {
              return new ParticipantValidatedAction(valid);
            }
            return new ValidateParticipantErrorAction({
              message: 'invalid participant',
            });
          }),
          catchError(error => {
            return of(
              new ValidateParticipantErrorAction({ message: error.message })
            );
          })
        )
    )
  );

  @Effect()
  invalidParticipant$ = this.actions$.pipe(
    ofType<SessionVerfiedAction>(ScopingActionTypes.VALIDATE_PARTICIPANT_ERROR),
    switchMap(action => of(new GoAction({ path: ['/dashboard'] })))
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private scopingSvc: ScopingService
  ) {}

  vote(userId, moderatorId, connectionId, sessionId, taskId, estimate) {
    this.store.dispatch(
      new VoteAction({
        userId,
        moderatorId,
        connectionId,
        sessionId,
        taskId,
        estimate,
      })
    );
  }

  validateParticipant(uid: string, sessionLink: string) {
    this.store.dispatch(
      new ValidateParticipantAction({ uid: uid, sessionLink: sessionLink })
    );
  }
}
