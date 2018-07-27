import { Component, OnInit } from "@angular/core";
import {
  ScopingSession,
  SessionValidation
} from "../../../../models/scoping-session";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { AppState } from "../../../../store/app.reducer";
import { AuthQuery } from "../../../authentication/store/auth.reducer";
import { User } from "../../../../models/user";
import { ScopingFacade } from "../../store/scoping.facade";

import { take, debounceTime, switchMap, share, concat } from "rxjs/operators";
import { ParticipantState } from "../../store/scoping.reducer";
import { NavParams, NavController } from "ionic-angular";
import { Task } from "../../../../models/task";

import * as _ from "lodash";
import { TIMER_FOR_NEXT_TASK } from "../../../../app/app.constants";
import { SessionResultsComponent } from "../session-results/session-results.component";
import { Subject, Subscription } from "rxjs";
import { DashboardComponent } from "../../../dashboard/pages/dashboard/dashboard.component";

@Component({
  selector: "app-session-scoping",
  templateUrl: "./session-scoping.component.html"
})
export class SessionScopingComponent implements OnInit {
  _ = _;
  sessionSub: Subscription;
  participantSub: Subscription;
  sessionObservable$: Observable<ScopingSession>;
  error$ = this.scopingFacade.error$;
  uiState$ = this.scopingFacade.uiState$;
  session$ = this.scopingFacade.session$;
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
    private navParams: NavParams,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // this.refresh.next();
    this.user$ = this.store.pipe(select(AuthQuery.selectUser));
    this.user$.subscribe(user => {
      this.user = user;
    });

    this.sessionObservable$ = this.session$.pipe(debounceTime(500));

    this.sessionSub = this.sessionObservable$.subscribe(session => {
      if (session && session.currentTaskId && this.user) {
        console.log("session: ", session);
        this.session = session;
        this.isModerator = session.ownerId === this.user.uid;
        this.taskId = this.session.currentTaskId;
        this.task = this.session.tasks[this.taskId];

        // Check if all tasks are estimated
        this.isComplete();
        // Check if user submitted vote
        this.didVote();

        console.log(this.scopedCount);
        console.log(this.session.numScopedTasks);

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
          console.log("setting timer...");
          this.timerOn = true;
          setTimeout(() => {
            this.nextTask();
          }, TIMER_FOR_NEXT_TASK);
        }
      }
    });

    this.sessionCode = this.navParams.get("sessionUrl");
    this.scopingFacade.validateParticipant(this.user.uid, this.sessionCode);

    this.participantSub = this.participantState$.subscribe(participantState => {
      this.participantState = participantState;
      if (participantState === ParticipantState.PARTICIPANT_VALIDATED) {
        this.scopingFacade.loadSession(this.sessionCode);
      }
    });
  }

  IonViewDidLeave() {
    console.log("did this run?");
    if (this.sessionSub) {
      console.log("Unsubscribing!");
      this.sessionSub.unsubscribe();
    }
    if (this.participantSub) {
      this.participantSub.unsubscribe();
    }
  }

  goDashboard() {
    this.navCtrl.push(DashboardComponent);
  }

  isComplete() {
    // Are all tasks estimated?
    if (this.session.numTasks === this.session.numScopedTasks) {
      if (this.sessionSub) {
        console.log("Unsubscribing!");
        this.sessionSub.unsubscribe();
      }
      this.navCtrl.push(SessionResultsComponent);
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
    let votes;
    let voteValue;

    if (!this.task.votes) {
      console.log("there are no votes");
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
    console.log("Next task");

    this.taskId = this.session.currentTaskId;
    this.task = this.session.tasks[this.taskId];

    this.estimateSubmitted = false;

    this.isComplete();
    this.timerOn = false;
  }
}
