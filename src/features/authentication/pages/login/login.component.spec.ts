import { LoginPage } from "./login.component";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Subscription } from "rxjs";
import { Actions } from "@ngrx/effects";

import { AppFacade } from "../../../../store/app.facade";
import { AuthFacade } from "../../store/auth.facade";
import { AuthActionTypes } from "../../store/auth.actions";
import { PopupService } from "../../../../shared/popup.service";
import { LoadingService } from "../../../../shared/loading.service";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { IAB_OPTIONS } from "../../../../app/app.constants";

describe("LoginPage", () => {
  it("should call createForm() on initialization", () => {
    let login: LoginPage;
    let fb = new FormBuilder();
    let authFacade = new AuthFacade(null, null, null, null);
    let navCtrl = new NavController();

    login = new LoginPage(
      fb,
      authFacade,
      navCtrl,
      actions,
      popupSvc,
      loadingSrv,
      iab
    );

    login.ngOnInit();

    expect(login.createForm).toHaveBeenCalled();
  });
});
