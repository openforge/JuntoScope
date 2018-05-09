import { Component, OnInit } from '@angular/core';
import { ScopingSession } from '@models/scoping-session';

@Component({
  selector: 'app-session-results',
  templateUrl: './session-results.component.html',
  styleUrls: ['./session-results.component.scss'],
})
export class SessionResultsComponent implements OnInit {
  session: ScopingSession;
  hasResults = false;

  constructor() {
    this.session = {
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
}
