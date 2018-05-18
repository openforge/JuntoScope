import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from 'angularfire2/firestore';

import { environment } from '@env/environment';
import { Faq } from '@models/faq';
import { AppFacade } from './../../state/app.facade';

import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SettingsService {
  constructor(
    private http: HttpClient,
    private appFacade: AppFacade,
    private afs: AngularFirestore
  ) {}

  getFaqs() {
    return this.appFacade.selectFaqsDocPath$.pipe(
      tap(res => console.log('getFaqs response from SettingsService:', res)),
      switchMap(faqsPath => {
        const collectionData = this.afs
          .collection(`${faqsPath}`)
          .stateChanges();

        collectionData.subscribe(res =>
          console.log('Faq Collection Data:', res)
        );

        return collectionData;
      }),
      tap(res => console.log('Response from calling afs.collection():', res))
    );
    // console.log('getFaqs() just got called');
    // const documentChangeAction = this.afs.collection('/faqs').stateChanges();
    // documentChangeAction.subscribe(res => console.log('documentChangeAction in getFaqs() before return statement:', res));
    // return documentChangeAction;
  }
}
