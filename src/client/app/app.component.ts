import { Component } from '@angular/core';

import { map } from 'rxjs/operators';

import { AuthFacade } from './authentication/state/auth.facade';
import { AuthCase } from './authentication/state/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private authFacade: AuthFacade) {}

  authenticaded$ = this.authFacade.authState$.pipe(
    map(authState => authState === AuthCase.AUTHENTICATED)
  );

  title = 'app';
}
