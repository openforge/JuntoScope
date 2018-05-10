import { Component, OnInit } from '@angular/core';
import { ScopingSession } from '@models/scoping-session';
import { Observable } from 'rxjs/Observable';
import { User } from '@models/user';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/state/app.reducer';
import { AuthQuery } from '@app/authentication/state/auth.reducer';
import { ScopingFacade } from '@app/scoping/state/scoping.facade';

@Component({
  selector: 'app-task-results',
  templateUrl: './task-results.component.html',
  styleUrls: ['./task-results.component.scss'],
})
export class TaskResultsComponent implements OnInit {
  session: ScopingSession;
  hasResults = false;
  user$: Observable<User>;
  user: User;
  isModerator = true;
  finalEstimate: number;

  constructor(
    private store: Store<AppState>,
    private scopingFacade: ScopingFacade
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

  ngOnInit() {}

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
}
