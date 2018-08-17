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
import { HistoryService } from "../../../dashboard/services/history.service";

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
  hasVoted: boolean = false;
  allVotesSubmited = false;
  hasResults = false;
  isModerator = true;
  timerToNextSet = false;
  estimateSubmitted = false;
  timerOn = false;
  votes: number = 0;
  lastTaskId: string;
  lastTaskVotes: Object;
  average: number = 0;
  max: number = 0;

  next: Subject<void> = new Subject();

  constructor(
    private store: Store<AppState>,
    private scopingFacade: ScopingFacade,
    private navParams: NavParams,
    private navCtrl: NavController,
    private historySvc: HistoryService
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

    // Sets next task
    this.otherSub = this.session$.subscribe(session => {
      console.log("new millenial fired");

      if (session && session.tasks) {
        this.session = session;
        this.isModerator = session.ownerId === this.user.uid;
        this.lastTaskId = this.taskId ? this.taskId : null;
        this.getLastTask();
        this.taskId = this.session.currentTaskId;
        this.task = this.session.tasks[this.taskId];

        this.didVote(session.tasks[this.taskId]);

        this.votes = session.tasks[this.taskId].votes
          ? Object.keys(session.tasks[session.currentTaskId].votes).length
          : 0;

        if (Object.keys(session.participants).length === this.votes) {
          this.allVotesSubmited = true;
        }

        if (this.allVotesSubmited && this.session.tasks[this.taskId].votes) {
          let voteSum = 0;
          let max = 0;
          Object.keys(this.session.tasks[this.taskId].votes).forEach(id => {
            let voteVal = this.session.tasks[this.taskId].votes[id];
            max = voteVal > max ? voteVal : max;
            voteSum += voteVal;
          });
          this.average =
            voteSum / Object.keys(this.session.tasks[this.taskId].votes).length;
          this.max = max;

          console.log("Average: ", this.average);
          console.log("Max: ", this.max);
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
          this.timerOn = true;
          setTimeout(() => {
            this.nextTask();
          }, TIMER_FOR_NEXT_TASK);
        }
      }
    });
  }

  async getLastTask() {
    console.log("getting last task");
    if (this.lastTaskId) {
      const lastTask = await this.historySvc.getSessionTask(
        {
          ownerId: this.session.ownerId,
          connectionId: this.session.connectionId,
          sessionId: this.session.sessionId
        },
        this.lastTaskId
      );

      const lastSub = lastTask.subscribe(task => {
        this.finalEstimate = task.estimate;
        this.lastTaskVotes = task.votes;
        lastSub.unsubscribe();
      });
    }
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
    this.allVotesSubmited = false;
    this.estimateSubmitted = false;
    this.finalEstimate = null;
    this.timerOn = false;
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
