import { Injectable } from '@angular/core';

import { Store, select, Action } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import {
  switchMap,
  catchError,
  map,
  mergeMap,
  filter,
  tap,
  mergeAll,
} from 'rxjs/operators';
import { of, merge, forkJoin, concat } from 'rxjs';

import { AppState } from '@app/state/app.reducer';
import {
  SettingsActionTypes,
  QueryFaqsAction,
  QueryFaqsErrorAction,
} from '@app/settings/state/settings.actions';
import { SettingsQuery } from '@app/settings/state/settings.reducer';

import { SettingsService } from './../services/settings.service';
import { Faq } from '@models/faq';

import { NoopAction } from '@app/state/app.actions';
import { DocumentChangeAction } from 'angularfire2/firestore';

@Injectable()
export class SettingsFacade {
  faqs$ = this.store.pipe(select(SettingsQuery.selectAll));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private settingsService: SettingsService
  ) {}

  @Effect()
  query$: Observable<Action> = this.actions$
    .ofType<QueryFaqsAction>(SettingsActionTypes.QUERY)
    .pipe(
      switchMap(action => {
        return this.settingsService.getFaqs();
      }),
      mergeMap(actions => actions),
      map(action => {
        return {
          type: `[Settings] ${action.type}`,
          payload: { id: action.payload.doc.id, ...action.payload.doc.data() },
        };
      })
    );

  getFaqs() {
    this.store.dispatch(new QueryFaqsAction());
  }
}
