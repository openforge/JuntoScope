import { Component, OnInit } from '@angular/core';
import { ScopingSession, SessionValidation } from '@models/scoping-session';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '@app/state/app.reducer';
import { AuthQuery } from '@app/authentication/state/auth.reducer';
import { User } from '@models/user';
import { ScopingFacade } from '@app/scoping/state/scoping.facade';
import { RouterFacade } from '@app/state/router.facade';
import { take } from 'rxjs/operators';
import { ParticipantState } from '@app/scoping/state/scoping.reducer';

@Component({
  selector: 'app-session-scoping',
  templateUrl: './session-scoping.component.html',
  styleUrls: ['./session-scoping.component.scss'],
})
export class SessionScopingComponent implements OnInit {
  ParticipantState = ParticipantState;
  session: ScopingSession;
  user$: Observable<User>;
  params$ = this.routerFacade.params$;
  participantState$ = this.scopingFacade.participantState$;
  user: User;
  sessionCode: string;
  error$ = this.scopingFacade.error$;
  uiState$ = this.scopingFacade.uiState$;
  session$ = this.scopingFacade.session$;
  hasVoted = false;
  hasResults = false;
  isModerator = true;
  finalEstimate: number;
  sessionLink: string;
  participantState: ParticipantState;

  constructor(
    private store: Store<AppState>,
    private scopingFacade: ScopingFacade,
    private routerFacade: RouterFacade
  ) {
    this.user$ = this.store.pipe(select(AuthQuery.selectUser));
    this.user$.subscribe(user => {
      this.user = user;
    });

    // this.uiState$.subscribe(state => {
    //   this.uiState = state;
    // });
    this.session$.subscribe(session => {
      this.session = session;
      if (this.session && this.user) {
        const votes = this.session.tasks[this.session.currentTaskId].votes;
        if (votes && votes[this.user.uid]) {
          this.hasVoted = true;
        } else {
          this.hasVoted = false;
        }
      }
    });
  }

  ngOnInit() {
    this.params$.pipe(take(1)).subscribe(params => {
      this.sessionCode = params.sessionCode;
      this.scopingFacade.validateParticipant(this.user.uid, this.sessionCode);
    });

    this.participantState$.subscribe(participantState => {
      this.participantState = participantState;
      if (participantState === ParticipantState.PARTICIPANT_VALIDATED) {
        this.scopingFacade.loadSession(this.sessionCode);
      }
    });
  }

  vote(estimate) {
    estimate = parseInt(estimate, 10);
    if (this.user && this.session) {
      this.scopingFacade.vote(
        this.user.uid,
        this.session.ownerId,
        this.session.connectionId,
        this.session.id,
        this.session.currentTaskId,
        estimate
      );
    }
  }

  setFinalEstimate(estimate) {
    this.finalEstimate = estimate;
  }

  saveFinalEstimate() {
    if (this.user && this.session) {
      this.scopingFacade.setFinalEstimate(
        this.user.uid,
        this.session.ownerId,
        this.session.connectionId,
        this.session.id,
        this.session.currentTaskId,
        this.finalEstimate
      );
    }
  }

  access(sessionValidation: SessionValidation) {
    this.scopingFacade.validateSession(sessionValidation);
  }
}
