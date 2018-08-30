import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { untilDestroyed } from "ngx-take-until-destroy";
import { map, filter, take } from "rxjs/operators";
import { Subscription } from "rxjs";
import { Actions } from "@ngrx/effects";

import { AppFacade } from "../../../../store/app.facade";
import { AuthFacade } from "../../store/auth.facade";
import { AuthActionTypes } from "../../store/auth.actions";
import { PopupService } from "../../../../shared/popup.service";
import { LoadingService } from "../../../../shared/loading.service";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { IAB_OPTIONS } from "../../../../app/app.constants";

@IonicPage({
  segment: "LoginPage",
  priority: "high"
})
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginPage implements OnInit, OnDestroy {
  agreeForm: FormGroup;
  errorSubscription: Subscription;
  redirectSubs: Subscription;
  authError$ = this.authFacade.error$;
  user$ = this.authFacade.user$;
  hasAgreed = false;

  private loginRedirect$ = this.appFacade.authRedirect$.pipe(
    untilDestroyed(this),
    filter(redirectUrl => !!redirectUrl),
    map(navOptions => {
      const query = this.navParams.get("query");
      if (query && query.returnUrl) {
        navOptions.path = [query.returnUrl];
      }

      return navOptions;
    })
  );

  constructor(
    private fb: FormBuilder,
    private appFacade: AppFacade,
    private authFacade: AuthFacade,
    private navCtrl: NavController,
    private navParams: NavParams,
    private actions$: Actions,
    private popupSvc: PopupService,
    private loadingSrv: LoadingService,
    private iab: InAppBrowser
  ) {
    this.redirectSubs = this.actions$
      .ofType(AuthActionTypes.AUTHENTICATED)
      .subscribe(() => {
        this.loadingSrv.dismiss();
        this.redirectSubs.unsubscribe();
        this.navCtrl.setRoot("DashboardPage");
      });

    this.errorSubscription = this.authError$.subscribe(error => {
      if (error) {
        this.loadingSrv.hide();
        if (error.code === "auth/account-exists-with-different-credential") {
          this.popupSvc.simpleAlert(
            "Oh...",
            `It seems like you are already signed in using this email with another provider and it can not be used again. 
            Please sign in with the correct provider.`,
            "OK"
          );
        } else {
          this.popupSvc.simpleAlert("Oh...", error, "OK");
        }
        this.authFacade.clearError();
      }
    });
  }

  ngOnInit() {
    this.createForm();
    this.loadingSrv.initialize();
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  createForm() {
    this.agreeForm = this.fb.group({
      agree: [false, Validators.required]
    });

    this.agreeForm.valueChanges.subscribe(data => {
      this.hasAgreed = data.agree;
    });
  }

  goToTerms() {
    this.iab.create(
      "https://docs.google.com/document/d/1T8z8bh285DOsPdthndKIrfECzAAgmg927BrTLrubKtg/",
      "_blank",
      IAB_OPTIONS
    );
  }

  goToPrivacy() {
    this.iab.create(
      "https://docs.google.com/document/d/11MIeUYBu0PstjpzJ_x3jk4thisxI6uarYNciIedqAW0/",
      "_blank",
      IAB_OPTIONS
    );
  }

  googleLogin() {
    this.loadingSrv.present();
    this.authFacade.googleLogin();
  }

  facebookLogin() {
    this.loadingSrv.present();
    this.authFacade.facebookLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {});
  }

  twitterLogin() {
    this.loadingSrv.present();
    this.authFacade.twitterLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {});
  }
}
