import { Component, OnInit, Input } from "@angular/core";
import { NavParams } from "ionic-angular";
import { PopupService } from "../../../../shared/popup.service";
import { InfoModalComponent } from "../../../../shared/components/info-modal/info-modal";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.reducer";
import {
  DeleteSessionAction,
  RefreshAccessCodeAction
} from "../../store/dashboard.actions";

import * as moment from "moment";

@Component({
  selector: "app-session-detail-modal",
  templateUrl: "./session-detail-modal.component.html"
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
      this.params.data.accountData.userType === "Session Moderator";
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
        title: "Are you sure?",
        text: "If you delete the session there is no come back.",
        label: "Delete",
        callback: () =>
          this.store.dispatch(
            new DeleteSessionAction(this.accountData.item.sessionCode)
          )
      }
    });
  }
}
