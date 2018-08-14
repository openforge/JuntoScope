import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ConnectionFacade } from "../../store/connection.facade";
import { Subscription } from "rxjs";
import {
  NavController,
  IonicPage,
  LoadingController,
  Loading
} from "ionic-angular";
import { ConnectionActionTypes } from "../../store/connection.actions";
import { Actions } from "@ngrx/effects";

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

  loading: Loading;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private connectionFacade: ConnectionFacade,
    private actions$: Actions,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create({
      spinner: "crescent",
      cssClass: "custom-loading"
    });
    this.redirectSubs = this.actions$
      .ofType(ConnectionActionTypes.ADD_SUCCESS)
      .subscribe(() => {
        this.loading.dismiss();
        this.redirectSubs.unsubscribe();
        this.navCtrl.push("DashboardPage");
      });
  }

  ngOnInit() {
    this.createForm();
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
      this.loading.present();
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
