import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { AppState } from "../../../store/app.reducer";
import { ScopingService } from "../services/scoping.service";
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
  LoadSessionAction,
  ClearErrorAction
} from "./scoping.actions";
import { PopupService } from "../../../shared/popup.service";
import { ScopingQuery } from "./scoping.reducer";
import { SessionValidation } from "../../../models/scoping-session";

@Injectable()
export class ScopingFacade {
  /**
   * Observable Store Queries
   */

  error$ = this.store.pipe(select(ScopingQuery.selectError));
  uiState$ = this.store.pipe(select(ScopingQuery.selectUiState));
  session$ = this.store.pipe(select(ScopingQuery.selectSession));

  participantState$ = this.store.pipe(
    select(ScopingQuery.selectParticipantState)
  );

  /**
   * Module-level Effects
   */

  @Effect()
  getSession = this.actions$.pipe(
    ofType<LoadSessionAction>(ScopingActionTypes.LOAD_SESSION),
    switchMap(action =>
      this.scopingSvc
        .getSession(action.payload)
        .pipe(map((session: any) => new LoadSessionSuccessAction(session)))
    ),
    catchError(error =>
      of(new LoadSessionErrorAction({ message: error.message }))
    )
  );

  @Effect({ dispatch: false })
  getSessionError$ = this.actions$.pipe(
    ofType<LoadSessionErrorAction>(ScopingActionTypes.LOAD_SESSION_ERROR),
    tap(action => {
      this.popupService.simpleAlert(
        "Error",
        "An error occurred while trying to load your session. Please, try again.",
        "Ok"
      );
    })
  );

  @Effect()
  vote$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.VOTE),
    switchMap(action =>
      this.scopingSvc
        .vote(action.payload)
        .then(() => {
          console.log("Vote saved successfully");
          return new VoteSuccessAction(action.payload);
        })
        .catch(({ message }) => {
          console.log("ERROR saving vote");
          return new VoteErrorAction({ message });
        })
    ),
    catchError(error => of(new VoteErrorAction({ message: error.message })))
  );

  @Effect({ dispatch: false })
  voteError$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.VOTE_ERROR),
    tap(action => {
      this.popupService.simpleAlert(
        "Error",
        "An error occurred while trying to save your vote. Please, try again.",
        "Ok"
      );
    })
  );

  @Effect()
  setEstimate$ = this.actions$.pipe(
    ofType<SetEstimateAction>(ScopingActionTypes.SET_ESTIMATE),
    switchMap(action =>
      this.scopingSvc.setEstimate(action.payload).pipe(
        map(data => new SetEstimateSuccessAction(action.payload)),
        catchError(error => {
          return of(new SetEstimateErrorAction({ message: error.message }));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  setEstimateSuccess$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.SET_ESTIMATE_SUCCESS),
    tap(action => {
      return action.payload.sessionId;
    })
  );

  @Effect({ dispatch: false })
  setEstimateError$ = this.actions$.pipe(
    ofType<VoteAction>(ScopingActionTypes.SET_ESTIMATE_ERROR),
    tap(() => {
      this.popupService.simpleAlert(
        "Error",
        "An error occurred while trying to save the final estimate. Please, try again.",
        "Ok"
      );
    })
  );

  @Effect()
  validateSession$ = this.actions$.pipe(
    ofType<ValidateSessionAction>(ScopingActionTypes.VALIDATE_SESSION),
    switchMap(action =>
      this.scopingSvc.validateSession(action.payload.sessionValidation).pipe(
        map(
          () =>
            new SessionVerfiedAction({
              sessionLink: action.payload.sessionValidation.sessionLink
            })
        ),
        catchError(error => {
          return of(new SessionJoinErrorAction({ message: error.message }));
        })
      )
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
              message: "invalid participant"
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

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private scopingSvc: ScopingService,
    private popupService: PopupService
  ) {}

  /**
   * Action Creators
   */

  loadSession(sessionCode) {
    this.store.dispatch(new LoadSessionAction(sessionCode));
  }

  vote(userId, moderatorId, connectionId, sessionId, taskId, estimate) {
    this.store.dispatch(
      new VoteAction({
        userId,
        moderatorId,
        connectionId,
        sessionId,
        taskId,
        estimate
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
        estimate
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

  ClearErrorAction() {
    this.store.dispatch(new ClearErrorAction());
  }
}
