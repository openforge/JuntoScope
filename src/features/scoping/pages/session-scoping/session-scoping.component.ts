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
import { sample } from "rxjs/operators";
import { ParticipantState } from "../../store/scoping.reducer";
import { NavParams, NavController, IonicPage } from "ionic-angular";
import { Task } from "../../../../models/task";
import * as _ from "lodash";
import {
  TIMER_FOR_NEXT_TASK,
  NOT_APPLICABLE,
  MORE_INFO_NEEDED
} from "../../../../app/app.constants";
import { Subject, Subscription } from "rxjs";

@IonicPage({
  segment: "SessionScopingPage",
  priority: "high"
})
@Component({
  selector: "app-session-scoping",
  templateUrl: "./session-scoping.component.html"
})
export class SessionScopingPage implements OnInit {
  _ = _;
  sessionSub: Subscription;
  participantSub: Subscription;
  otherSub: Subscription;

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

  next: Subject<void> = new Subject();

  constructor(
    private store: Store<AppState>,
    private scopingFacade: ScopingFacade,
    private navParams: NavParams,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(AuthQuery.selectUser));
    this.user$.subscribe(user => {
      this.user = user;
    });

    this.sessionCode = this.navParams.get("sessionUrl");
    this.scopingFacade.validateParticipant(this.user.uid, this.sessionCode);

    this.participantSub = this.participantState$.subscribe(participantState => {
      this.participantState = participantState;
      if (participantState === ParticipantState.PARTICIPANT_VALIDATED) {
        this.scopingFacade.loadSession(this.sessionCode);
      }
    });

    this.sessionObservable$ = this.session$.pipe(sample(this.next));

    // Sets next task
    this.otherSub = this.session$.subscribe(session => {
      console.log("new millenial fired");

      if (session && session.tasks) {
        if (!this.session) {
          this.session = session;
          this.isModerator = session.ownerId === this.user.uid;
          this.taskId = this.session.currentTaskId;
          this.task = this.session.tasks[this.taskId];
        }

        const task = session.tasks ? session.tasks[this.taskId] : null;

        if (task) {
          this.didVote(task);
        }

        if (this.scopedCount === undefined) {
          this.scopedCount = session.numScopedTasks;
        } else if (this.scopedCount < session.numScopedTasks) {
          this.scopedCount = session.numScopedTasks;
          this.estimateSubmitted = true;
        } else {
          this.estimateSubmitted = false;
        }

        // if has voted and estimate submitted, go to next task
        if (this.estimateSubmitted) {
          console.log("setting timer!");
          setTimeout(() => {
            this.nextTask();
          }, TIMER_FOR_NEXT_TASK);
        }
      }
    });

    // Loads session, sets current task
    this.sessionSub = this.sessionObservable$.subscribe(session => {
      console.log("old fart fired");
      if (session && session.currentTaskId && this.user) {
        console.log("loading session");
        this.session = session;
        this.isModerator = session.ownerId === this.user.uid;
        this.taskId = this.session.currentTaskId;
        this.task = this.session.tasks[this.taskId];

        // Check if all tasks are estimated
        this.isComplete();
        // Check if user submitted vote
        // this.didVote(this.task);
      }
    });
  }

  unsub() {
    if (this.sessionSub) {
      this.sessionSub.unsubscribe();
    }
    if (this.participantSub) {
      this.participantSub.unsubscribe();
    }
    if (this.otherSub) {
      this.otherSub.unsubscribe();
    }
  }

  goDashboard() {
    this.unsub();
    this.navCtrl.push("DashboardPage");
  }

  isComplete() {
    // Are all tasks estimated?
    if (this.session.numTasks === this.session.numScopedTasks) {
      if (this.sessionSub) {
        this.sessionSub.unsubscribe();
      }
      this.navCtrl.push("SessionResultsPage");
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

  didVote(task) {
    let votes;
    let voteValue;

    if (!task.votes) {
    } else {
      votes = task.votes;
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
    console.log("next task...");
    this.hasVoted = false;
    this.estimateSubmitted = false;
    this.next.next();

    this.isComplete();
  }

  needMoreInfo() {
    this.vote(MORE_INFO_NEEDED);
  }

  notApplicable() {
    this.vote(NOT_APPLICABLE);
  }
}
