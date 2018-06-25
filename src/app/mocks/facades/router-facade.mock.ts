import { Location } from '@angular/common';
import { Params, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { AppState } from './../../state/app.reducer';

import { RouterFacade } from './../../state/router.facade';

export class RouterFacadeMock extends RouterFacade {
  constructor(
    store: Store<AppState>,
    location: Location,
    actions$: Actions,
    router: Router
  ) {
    super(store, actions$, router, location);
  }

  params$: Observable<Params> = new Observable<Params>();
}
