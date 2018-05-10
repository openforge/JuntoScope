import { Component, OnInit } from '@angular/core';
import { ScopingSession } from '@models/scoping-session';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '@app/state/app.reducer';
import { AuthQuery } from '@app/authentication/state/auth.reducer';
import { User } from '@models/user';
import { ScopingFacade } from '@app/scoping/state/scoping.facade';

@Component({
  selector: 'app-session-scoping',
  templateUrl: './session-scoping.component.html',
  styleUrls: ['./session-scoping.component.scss'],
})
export class SessionScopingComponent implements OnInit {
  session: ScopingSession;
  user$: Observable<User>;

  constructor(
    private store: Store<AppState>,
    private scopingFacade: ScopingFacade
  ) {
    this.user$ = this.store.pipe(select(AuthQuery.selectUser));

    this.session = {
      id: '1',
      ownerId: 'a',
      projectName: 'Test project',
      currentTaskId: '1',
      numTasks: 2,
      numScopedTasks: 0,
      tasks: {
        1: {
          name: 'Test task 1',
          description: 'This is a description',
          votes: {
            a: 3,
            b: 5,
          },
        },
        2: {
          name: 'Test task 2',
          description: 'This is a description',
          votes: {
            a: 10,
            b: 20,
          },
        },
      },
      participants: {
        a: 1111,
        b: 2222,
      },
    };
  }

  ngOnInit() {}

  vote(estimate) {
    console.log('Voted', estimate);

    estimate = parseInt(estimate, 10);
    this.user$.subscribe(user => {
      const moderatorId = '4unCMQb5lGgORDo2Y5UUWlBcUHj1';
      const connectionId = 'THfDyZ5ql7PbyDvzuyuZ';
      const sessionId = 'xIUiPVQX1pn0sbKdC6EF'; // this.session.id
      const taskId = 'prFpkJAGoM4HnRkajCys'; // this.session.currentTaskId

      this.scopingFacade.vote(
        user.uid,
        moderatorId,
        connectionId,
        sessionId,
        taskId,
        estimate
      );
    });
  }
}
