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
  }

  ngOnInit() {}
}
