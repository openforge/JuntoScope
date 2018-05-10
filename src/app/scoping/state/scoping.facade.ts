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
} from '@app/scoping/state/scoping.actions';
import { RouterFacade } from '@app/state/router.facade';
import { PopupService } from '@app/shared/popup.service';

@Injectable()
export class ScopingFacade {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private scopingSvc: ScopingService,
    private routerFacade: RouterFacade,
    private popupService: PopupService
  ) {}

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
  voteError$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.VOTE_ERROR),
    take(1),
    tap(action => {
      this.popupService.alert(
        'Error',
        'An error occurred while trying to save your vote. Please, try again.',
        'Ok'
      );
    })
  );

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
}
