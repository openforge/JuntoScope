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

    this.session = {
      id: 'xIUiPVQX1pn0sbKdC6EF',
      ownerId: '4unCMQb5lGgORDo2Y5UUWlBcUHj1',
      connectionId: 'THfDyZ5ql7PbyDvzuyuZ',
      projectName: 'Test project',
      currentTaskId: 'prFpkJAGoM4HnRkajCys',
      numTasks: 2,
      numScopedTasks: 0,
      tasks: {
        prFpkJAGoM4HnRkajCys: {
          name: 'Test task 1',
          description: 'This is a description',
          votes: {
            '4unCMQb5lGgORDo2Y5UUWlBcUHj1': 3,
          },
          estimate: null,
        },
      },
      participants: {
        '4unCMQb5lGgORDo2Y5UUWlBcUHj1': 1111,
      },
    };
  }

  ngOnInit() {
    this.params$.pipe(take(1)).subscribe(params => {
      this.sessionLink = params.sessionId;
      this.scopingFacade.validateParticipant(this.user.uid, this.sessionLink);
    });

    this.participantState$.subscribe(participantState => {
      this.participantState = participantState;
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

  access(sessionValidation: SessionValidation) {
    this.scopingFacade.validateSession(sessionValidation);
  }
}
