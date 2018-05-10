import { Component, OnInit } from '@angular/core';
import { ScopingSession } from '@models/scoping-session';

@Component({
  selector: 'app-session-scoping',
  templateUrl: './session-scoping.component.html',
  styleUrls: ['./session-scoping.component.scss'],
})
export class SessionScopingComponent implements OnInit {
  session: ScopingSession;

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
        1: 1111,
        2: 2222,
      },
    };
  }

  ngOnInit() {}

  vote(estimate) {
    console.log('Voted', estimate);
  }
}
