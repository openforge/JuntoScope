import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { PopupService } from '@app/shared/popup.service';
import { InfoModalComponent } from '@app/shared/components/info-modal/info-modal.component';
import { AppState } from '@app/state/app.reducer';
import { Store } from '@ngrx/store';
import { RefreshAccessCodeAction } from '@app/dashboard/state/dashboard.actions';

import * as moment from 'moment';
import { DeleteSessionAction } from '@app/dashboard/state/dashboard.actions';

@Component({
  selector: 'app-session-detail-modal',
  templateUrl: './session-detail-modal.component.html',
  styleUrls: ['./session-detail-modal.component.scss'],
})
export class SessionDetailModalComponent implements OnInit {
  accountData;
  isModerator: boolean;
  expirationDate;

  constructor(
    private popupSvc: PopupService,
    private params: NavParams,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.accountData = this.params.data.accountData;
    this.isModerator =
      this.params.data.accountData.userType === 'Session Moderator';
    const now = moment();
    this.expirationDate = now.to(this.accountData.item.expirationDate);
  }

  closeModal() {
    this.popupSvc.closeModal();
  }

  refreshCode() {
    this.popupSvc.closeModal();
    this.store.dispatch(
      new RefreshAccessCodeAction(this.accountData.item.sessionCode)
    );
  }

  deleteSession() {
    this.popupSvc.closeModal();
    this.popupSvc.openModal({
      component: InfoModalComponent,
      componentProps: {
        title: 'Are you sure?',
        text: 'If you delete the session there is no come back.',
        label: 'Delete',
        callback: () => console.log('accepted to delete session'),
      },
    });
  }
}
