import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  NavController,
  IonicPage,
  LoadingController,
  Loading
} from "ionic-angular";

import { Actions } from "@ngrx/effects";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { ConnectionActionTypes, ClearErrorAction } from "../../store/connection.actions";
import { PopupService } from "../../../../shared/popup.service";
import { ConnectionFacade } from "../../store/connection.facade";
import { AppState } from "../../../../store/app.reducer";
import { LoadingService } from "../../../../shared/loading.service";


@IonicPage({
  segment: "AddConnectionPage",
  priority: "high"
})
@Component({
  selector: "app-add-connection",
  templateUrl: "./add-connection.component.html"
})
export class AddConnectionPage implements OnInit {
  connectionForm: FormGroup;
  type: string;

  addError$ = this.connectionFacade.error$;

  redirectSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private connectionFacade: ConnectionFacade,
    private actions$: Actions,
    private loadingCtrl: LoadingController,
    private popupSvc: PopupService,
    private loadingSvc: LoadingService
  ) {
    this.redirectSubs = this.actions$
      .ofType(ConnectionActionTypes.ADD_SUCCESS)
      .subscribe(() => {
        this.loadingSvc.dismiss();
        this.redirectSubs.unsubscribe();
        this.navCtrl.push("DashboardPage");
      });

    this.addError$.subscribe(error => {
      if (error) {
        this.loadingSvc.recreate();
        this.popupSvc.simpleAlert("Uh Oh!", error, "OK");
        this.store.dispatch(new ClearErrorAction());
      }
    });
  }

  ngOnInit() {
    this.createForm();
    this.loadingSvc.initialize();
  }

  setType(type: string) {
    this.type = type;
  }

  continue() {
    if (this.connectionForm.valid) {
      const connection = {
        token: this.connectionForm.get("token").value,
        type: this.type
      };
      this.loadingSvc.present();
      this.connectionFacade.addConnection(connection);
    } else {
      this.connectionForm.get("token").markAsDirty();
    }
  }

  createForm() {
    this.connectionForm = this.fb.group({
      token: ["", Validators.required]
    });
  }
}
