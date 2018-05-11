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
  SetEstimateAction,
  SetEstimateSuccessAction,
  SetEstimateErrorAction,
  ScopingActionTypes,
  LoadSessionSuccessAction,
  LoadSessionErrorAction,
  ValidateSessionAction,
  SessionVerfiedAction,
  SessionJoinErrorAction,
  ValidateParticipantAction,
  ParticipantValidatedAction,
  ValidateParticipantErrorAction,
} from '@app/scoping/state/scoping.actions';
import { RouterFacade } from '@app/state/router.facade';
import { PopupService } from '@app/shared/popup.service';
import { HistoryService } from '@app/dashboard/services/history.service';
import { ScopingQuery } from '@app/scoping/state/scoping.reducer';
import { GoAction } from '@app/state/router.actions';
import { SessionValidation } from '@models/scoping-session';

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

  // @Effect()
  // getSession = this.actions$.pipe(
  //   ofType<VoteAction>(ScopingActionTypes.LOAD_SESSION),
  //   switchMap(action =>
  //     this.historySvc
  //       .getSession(action.payload.ownerId, action.payload.connectionId, action.payload.sessionId)
  //       .then(() => {
  //         console.log('Session fetched successfully');
  //         return new LoadSessionSuccessAction(action.payload);
  //       })
  //       .catch(({ message }) => {
  //         console.log('ERROR fetching session');
  //         return new LoadSessionErrorAction({ message });
  //       })
  //   ),
  //   catchError(error => of(new LoadSessionErrorAction({ message: error.message })))
  // );

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

  @Effect({ dispatch: false })
  voteSuccess$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.VOTE_SUCCESS),
    tap(action => {
      const sessionId = action.payload.sessionId;
      const taskId = action.payload.taskId;
      this.routerFacade.navigate({
        path: [`/scoping/${sessionId}/tasks/${taskId}/results`],
      });
    })
  );

  @Effect({ dispatch: false })
  voteError$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.VOTE_ERROR),
    tap(action => {
      this.popupService.simpleAlert(
        'Error',
        'An error occurred while trying to save your vote. Please, try again.',
        'Ok'
      );
    })
  );

  @Effect()
  setEstimate$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.SET_ESTIMATE),
    switchMap(action =>
      this.scopingSvc
        .setEstimate(action.payload)
        .then(() => {
          console.log('Estimate saved successfully');
          return new SetEstimateSuccessAction(action.payload);
        })
        .catch(({ message }) => {
          console.log('ERROR saving estimate');
          return new SetEstimateErrorAction({ message });
        })
    ),
    catchError(error =>
      of(new SetEstimateErrorAction({ message: error.message }))
    )
  );

  @Effect({ dispatch: false })
  setEstimateSuccess$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.SET_ESTIMATE_SUCCESS),
    tap(action => {
      const sessionId = action.payload.sessionId;
      this.routerFacade.navigate({ path: [`/scoping/${sessionId}/results`] });
    })
  );

  @Effect({ dispatch: false })
  setEstimateError$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.SET_ESTIMATE_ERROR),
    tap(action => {
      this.popupService.simpleAlert(
        'Error',
        'An error occurred while trying to save the final estimate. Please, try again.',
        'Ok'
      );
    })
  );

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
    private scopingSvc: ScopingService,
    private historySvc: HistoryService,
    private routerFacade: RouterFacade,
    private popupService: PopupService
  ) {}

  /*
  * Action Creators
  */
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

  setFinalEstimate(
    userId,
    moderatorId,
    connectionId,
    sessionId,
    taskId,
    estimate
  ) {
    this.store.dispatch(
      new SetEstimateAction({
        userId,
        moderatorId,
        connectionId,
        sessionId,
        taskId,
        estimate,
      })
    );
  }

  validateSession(sessionValidation: SessionValidation) {
    this.store.dispatch(new ValidateSessionAction({ sessionValidation }));
  }

  validateParticipant(uid: string, sessionLink: string) {
    this.store.dispatch(
      new ValidateParticipantAction({ uid: uid, sessionLink: sessionLink })
    );
  }
}
