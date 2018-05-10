import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { PopupService } from '@app/shared/popup.service';

@Component({
  selector: 'app-session-detail-modal',
  templateUrl: './session-detail-modal.component.html',
  styleUrls: ['./session-detail-modal.component.scss'],
})
export class SessionDetailModalComponent implements OnInit {

  accountData;
  isModerator: boolean;

  constructor(private popupSvc: PopupService, private params: NavParams) {}

  ngOnInit() {
    this.accountData = this.params.data.accountData;
    this.isModerator =  this.params.data.accountData.userType === 'Session Moderator';
  }

  dismiss() {
    this.popupSvc.closeModal();
  }
}
