import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ConnectionFacade } from "../../store/connection.facade";
import { Subscription } from "../../../../../node_modules/rxjs";
import { NavController } from "ionic-angular";
import { ConnectionActionTypes } from "../../store/connection.actions";
import { Actions } from "@ngrx/effects";

@Component({
  selector: "app-add-connection",
  templateUrl: "./add-connection.component.html"
})
export class AddConnectionComponent implements OnInit {
  connectionForm: FormGroup;
  type: string;

  addError$ = this.connectionFacade.error$;

  redirectSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private connectionFacade: ConnectionFacade,
    private actions$: Actions
  ) {
    this.redirectSubs = this.actions$
      .ofType(ConnectionActionTypes.ADD_SUCCESS)
      .subscribe(() => {
        this.redirectSubs.unsubscribe();
        this.navCtrl.setRoot("DashboardComponent");
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
