import { Component, OnInit } from '@angular/core';
import { ScopingSession } from '@models/scoping-session';

import { Observable } from 'rxjs/Observable';
import { User } from '@models/user';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/state/app.reducer';
import { AuthQuery } from '@app/authentication/state/auth.reducer';

@Component({
  selector: 'app-session-results',
  templateUrl: './session-results.component.html',
  styleUrls: ['./session-results.component.scss'],
})
export class SessionResultsComponent implements OnInit {
  session: ScopingSession;
  hasResults = false;
  user$: Observable<User>;
  user: User;
  isModerator = true;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(AuthQuery.selectUser));
    this.user$.subscribe(user => {
      this.user = user;
    });

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
          },
          estimate: null,
        },
        2: {
          name: 'Test task 2',
          description: 'This is a description',
          votes: {
            a: 10,
            b: 20,
          },
          estimate: null,
        },
      },
      participants: {
        a: 1111,
        b: 2222,
      },
    };
  }

  ngOnInit() {}

  saveFinalEstimate(estimate) {
    console.log('Final estimate', estimate);
  }
}
