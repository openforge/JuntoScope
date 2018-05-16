import { Component, OnInit } from '@angular/core';
import { ScopingSession } from '@models/scoping-session';

import { Observable } from 'rxjs/Observable';
import { User } from '@models/user';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/state/app.reducer';
import { AuthQuery } from '@app/authentication/state/auth.reducer';
import { ScopingFacade } from '@app/scoping/state/scoping.facade';
import { RouterFacade } from '@app/state/router.facade';
import { take } from 'rxjs/operators';
import { ParticipantState } from '@app/scoping/state/scoping.reducer';

@Component({
  selector: 'app-session-results',
  templateUrl: './session-results.component.html',
  styleUrls: ['./session-results.component.scss'],
})
export class SessionResultsComponent implements OnInit {
  ParticipantState = ParticipantState;
  sessionCode: string;

  uiState$ = this.scopingFacade.uiState$;
  session$ = this.scopingFacade.session$;

  user$: Observable<User>;
  params$ = this.routerFacade.params$;
  participantState$ = this.scopingFacade.participantState$;
  participantState: ParticipantState;
  user: User;

  constructor(
    private store: Store<AppState>,
    private scopingFacade: ScopingFacade,
    private routerFacade: RouterFacade
  ) {
    this.user$ = this.store.pipe(select(AuthQuery.selectUser));
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.params$.pipe(take(1)).subscribe(params => {
      this.sessionCode = params.sessionCode;
      this.scopingFacade.validateParticipant(this.user.uid, this.sessionCode);
    });

    this.participantState$.subscribe(participantState => {
      this.participantState = participantState;
      if (participantState === ParticipantState.PARTICIPANT_VALIDATED) {
        this.scopingFacade.loadSession(this.sessionCode);
      }
    });
  }
}
