import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';

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
  SetFaqsAction,
  NoFaqsFoundAction,
  QueryFaqsErrorAction,
} from '@app/settings/state/settings.actions';
import { SettingsQuery } from '@app/settings/state/settings.reducer';

import { SettingsService } from './../services/settings.service';
import { Faq } from '@models/faq';

import { NoopAction } from '@app/state/app.actions';
import { DocumentChangeAction } from 'angularfire2/firestore';

@Injectable()
export class SettingsFacade {
  faqs$ = this.store.pipe(select(SettingsQuery.selectFaqs));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private settingsService: SettingsService
  ) {}

  @Effect()
  getFaqs$ = this.actions$.pipe(
    ofType<QueryFaqsAction>(SettingsActionTypes.QUERY_FAQS),
    tap(res => console.log('QueryFaqsAction just got called:', res)),
    switchMap(() => this.settingsService.getFaqs()),
    // tap(() => console.log('Hi Everybody!'),
    // mergeMap(changeActions => changeActions),
    map(changeActions => {
      return new NoopAction();
    }),
    catchError(error =>
      of(new QueryFaqsErrorAction({ message: error.message }))
    )
  );

  getFaqs() {
    this.store.dispatch(new QueryFaqsAction());
  }
}

const itemsFromChangeActions = (changes: DocumentChangeAction[]): Faq[] => {
  let faqs;
  const dfsdf = changes.forEach(change => {
    const id = change.payload.doc.id;
    const data = change.payload.doc.data();
    console.log('inside of itemsFromChangeActions()');
    faqs += { id, ...data };
  });

  return faqs;
};
