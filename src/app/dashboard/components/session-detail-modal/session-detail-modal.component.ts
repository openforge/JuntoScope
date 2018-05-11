import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { PopupService } from '@app/shared/popup.service';
import { InfoModalComponent } from '@app/shared/components/info-modal/info-modal.component';
import { Store } from '@ngrx/store';
import { AppState } from '@app/state/app.reducer';
import { DeleteSessionAction } from '@app/dashboard/state/dashboard.actions';

@Component({
  selector: 'app-session-detail-modal',
  templateUrl: './session-detail-modal.component.html',
  styleUrls: ['./session-detail-modal.component.scss'],
})
export class SessionDetailModalComponent implements OnInit {

  accountData;
  isModerator: boolean;

  constructor(private popupSvc: PopupService, private params: NavParams, private store: Store<AppState>) {}

  ngOnInit() {
    this.accountData = this.params.data.accountData;
    this.isModerator =  this.params.data.accountData.userType === 'Session Moderator';
  }

  dismiss() {
    this.popupSvc.closeModal();
  }

  deleteSession() {
    this.popupSvc.closeModal();
    this.popupSvc.openModal(
      {
        component: InfoModalComponent,
        componentProps: {
          'title': 'Are you sure?',
          'text': 'If you delete the session there is no come back.',
          'label': 'Delete',
          'callback': () => this.store.dispatch(new DeleteSessionAction(this.accountData.item.sessionCode))
        }
      });
  }
}
