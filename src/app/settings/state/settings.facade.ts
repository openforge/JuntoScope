import { SettingsService } from './../services/settings.service';
import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';

import {
  switchMap,
  catchError,
  map,
  mergeMap,
  tap,
  mergeAll,
} from 'rxjs/operators';
import { of, merge, forkJoin, concat } from 'rxjs';

import { AppState } from '@app/state/app.reducer';

import { NoopAction } from '@app/state/app.actions';
import { DocumentChangeAction } from 'angularfire2/firestore';

@Injectable()
export class SettingsFacade {
  faqs$; // = this.store.pipe(select(faqsQuery.selectFaqs));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private settingsService: SettingsService
  ) {}
}
