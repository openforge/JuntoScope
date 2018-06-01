import { Component, OnInit } from '@angular/core';
import { ScopingSession, SessionValidation } from '@models/scoping-session';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '@app/state/app.reducer';
import { AuthQuery } from '@app/authentication/state/auth.reducer';
import { User } from '@models/user';
import { ScopingFacade } from '@app/scoping/state/scoping.facade';
import { RouterFacade } from '@app/state/router.facade';
import { take, debounceTime } from 'rxjs/operators';
import { ParticipantState } from '@app/scoping/state/scoping.reducer';
import { TIMER_FOR_NEXT_TASK } from '@app/app.constants';
import { Task } from '@models/task';

import * as _ from 'lodash';

@Component({
  selector: 'app-session-scoping',
  templateUrl: './session-scoping.component.html',
  styleUrls: ['./session-scoping.component.scss'],
})
export class SessionScopingComponent implements OnInit {
  _ = _;

  sessionObservable$: Observable<ScopingSession>;

  error$ = this.scopingFacade.error$;
  uiState$ = this.scopingFacade.uiState$;
  session$ = this.scopingFacade.session$;
  params$ = this.routerFacade.params$;
  participantState$ = this.scopingFacade.participantState$;
  user$: Observable<User>;
  participantState: ParticipantState;
  session: ScopingSession;
  user: User;
  task: Task;
  taskId: string;
  sessionCode: string;
  sessionLink: string;
  scopedCount: number;
  finalEstimate: number;
  navigateTimer: any;
  ParticipantState = ParticipantState;
  hasVoted = false;
  hasResults = false;
  isModerator = true;
  timerToNextSet = false;
  estimateSubmitted = false;
  timerOn = false;

  constructor(
    private store: Store<AppState>,
    private scopingFacade: ScopingFacade,
    private routerFacade: RouterFacade
  ) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(AuthQuery.selectUser));
    this.user$.subscribe(user => {
      this.user = user;
    });

    this.sessionObservable$ = this.session$.pipe(debounceTime(500));

    this.sessionObservable$.subscribe(session => {
      if (session && this.user) {
        this.session = session;
        this.isModerator = session.ownerId === this.user.uid;
        this.taskId = this.session.currentTaskId;
        this.task = this.session.tasks[this.taskId];

        // Check if all tasks are estimated
        this.isComplete();
        // Check if user submitted vote
        this.didVote();

        if (this.scopedCount === undefined) {
          this.scopedCount = this.session.numScopedTasks;
        } else if (this.scopedCount < this.session.numScopedTasks) {
          this.scopedCount = this.session.numScopedTasks;
          this.estimateSubmitted = true;
        } else {
          this.estimateSubmitted = false;
        }

        // if has voted and estimate submitted, go to next task
        if (this.estimateSubmitted) {
          console.log('setting timer...');
          this.timerOn = true;
          setTimeout(() => {
            this.nextTask();
          }, TIMER_FOR_NEXT_TASK);
        }
      }
    });

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

  isComplete() {
    // Are all tasks estimated?
    if (this.session.numTasks === this.session.numScopedTasks) {
      this.routerFacade.navigate({
        path: [`/scoping/${this.sessionCode}/results`],
        extras: { skipLocationChange: true },
      });
    }
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

  didVote() {
    // const task = this.session.tasks[this.taskId];
    let votes;
    let voteValue;

    if (!this.task.votes) {
      console.log('there are no votes');
    } else {
      votes = this.task.votes;
      voteValue = votes[this.user.uid];
    }

    if (votes && voteValue !== undefined) {
      this.hasVoted = true;
      return true;
    } else {
      this.hasVoted = false;
      return false;
    }
  }

  nextTask() {
    console.log('Next task');

    this.estimateSubmitted = false;

    this.isComplete();
    this.timerOn = false;
  }
}
