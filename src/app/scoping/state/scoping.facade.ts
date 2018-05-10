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
} from '@app/scoping/state/scoping.actions';
import { RouterFacade } from '@app/state/router.facade';
import { PopupService } from '@app/shared/popup.service';

@Injectable()
export class ScopingFacade {
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
      this.routerFacade.navigate({
        path: [`/scoping/${sessionId}/tasks/${action.payload.taskId}/results`],
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

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private scopingSvc: ScopingService,
    private routerFacade: RouterFacade,
    private popupService: PopupService
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
}
