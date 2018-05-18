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
import * as _ from 'lodash';
import { TIMER_FOR_NEXT_TASK } from '@app/app.constants';
import { Task } from '@models/task';

@Component({
  selector: 'app-session-scoping',
  templateUrl: './session-scoping.component.html',
  styleUrls: ['./session-scoping.component.scss'],
})
export class SessionScopingComponent implements OnInit {
  _ = _;

  ParticipantState = ParticipantState;
  session: ScopingSession;
  task: Task;
  taskId: string;
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
  navigateTimer: any;
  timerToNextSet = false;

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
      if (session && this.user) {
        this.session = session;
        this.isModerator = session.ownerId === this.user.uid;

        // If no taskId set, use current from session
        if (!this.taskId) {
          this.taskId = session.currentTaskId;
        }

        // Always update task so the results become updated
        this.task = this.session.tasks[this.taskId];
        if (!this.timerToNextSet) {
          this.nextTask();
        }

        // If estimate given, show results for 5 sec, otherwise show straight away
        if (session.tasks[this.taskId].estimate) {
          this.timerToNextSet = true;
          this.taskId = session.currentTaskId;
          this.navigateTimer = setTimeout(() => {
            this.nextTask();
          }, TIMER_FOR_NEXT_TASK);
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
        this.session.sessionId,
        this.taskId,
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
        this.session.sessionId,
        this.taskId,
        this.finalEstimate
      );
    }
  }

  access(sessionValidation: SessionValidation) {
    this.scopingFacade.validateSession(sessionValidation);
  }

  nextTask() {
    console.log('Next task');
    if (this.navigateTimer) {
      clearTimeout(this.navigateTimer);
    }

    // Is all tasks estimated?
    if (this.session.numTasks === this.session.numScopedTasks) {
      this.routerFacade.navigate({
        path: [`/scoping/${this.sessionCode}/results`],
      });
    } else {
      this.task = this.session.tasks[this.taskId];
      const votes = this.task.votes;
      const voteValue = votes[this.user.uid];
      if (votes && voteValue !== undefined) {
        this.hasVoted = true;
      } else {
        this.hasVoted = false;
      }
    }
  }
}
