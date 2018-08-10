import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ConnectionFacade } from "../../store/connection.facade";
import { Subscription } from "rxjs";
import { NavController, IonicPage } from "ionic-angular";
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
        this.navCtrl.setRoot('DashboardPage');
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
