import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from 'angularfire2/firestore';

import { environment } from '@env/environment';
import { Faq } from '@models/faq';
import { SettingsFacade } from '@app/settings/state/settings.facade';

import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class SettingsService {
  constructor(
    private http: HttpClient,
    private settingsFacade: SettingsFacade,
    private afs: AngularFirestore
  ) {}

  getFaqs() {
    return this.settingsFacade.selectFaqsDocPath$.pipe(
      switchMap(faqsPath => this.afs.collection(faqsPath).stateChanges())
    );
  }
}
