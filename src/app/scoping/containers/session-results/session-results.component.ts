import { Component, OnInit } from '@angular/core';
import { ScopingSession } from '@models/scoping-session';

import { Observable } from 'rxjs/Observable';
import { User } from '@models/user';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/state/app.reducer';
import { AuthQuery } from '@app/authentication/state/auth.reducer';
import { ScopingFacade } from '@app/scoping/state/scoping.facade';

@Component({
  selector: 'app-session-results',
  templateUrl: './session-results.component.html',
  styleUrls: ['./session-results.component.scss'],
})
export class SessionResultsComponent implements OnInit {
  session: ScopingSession;

  constructor(
    private store: Store<AppState>,
    private scopingFacade: ScopingFacade
  ) {
    this.session = {
      id: 'xIUiPVQX1pn0sbKdC6EF',
      ownerId: '4unCMQb5lGgORDo2Y5UUWlBcUHj1',
      connectionId: 'THfDyZ5ql7PbyDvzuyuZ',
      projectName: 'Test project',
      currentTaskId: 'prFpkJAGoM4HnRkajCys',
      numTasks: 1,
      numScopedTasks: 1,
      tasks: {
        prFpkJAGoM4HnRkajCys: {
          name: 'Test task 1',
          description: 'This is a description',
          votes: {
            '4unCMQb5lGgORDo2Y5UUWlBcUHj1': 3,
          },
          estimate: 5,
        },
      },
      participants: {
        '4unCMQb5lGgORDo2Y5UUWlBcUHj1': 1111,
      },
    };
  }

  ngOnInit() {}
}
