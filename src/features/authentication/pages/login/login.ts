import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { untilDestroyed } from "ngx-take-until-destroy";
import { map, filter, take } from "rxjs/operators";
import { AuthFacade } from "../../store/auth.facade";
import { AppFacade } from "../../../../store/app.facade";
import { Subscription } from "rxjs";
import { Actions } from "@ngrx/effects";
import { AuthActionTypes } from "../../store/auth.actions";

@IonicPage({
  segment: "LoginPage",
  priority: "high"
})
@Component({
  selector: "app-login",
  templateUrl: "./login.html"
})
export class LoginPage implements OnInit {
  agreeForm: FormGroup;
  // loading$ = this.authFacade.uiState$.pipe(
  //   map(uiState => uiState === AuthUiState.LOADING)
  // );

  // authError$ = this.authFacade.error$;
  hasAgreed = false;

  user$ = this.authFacade.user$;

  redirectSubs: Subscription;

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
    private actions$: Actions
  ) {
    this.redirectSubs = this.actions$
      .ofType(AuthActionTypes.AUTHENTICATED)
      .subscribe(() => {
        this.redirectSubs.unsubscribe();
        this.navCtrl.setRoot("DashboardPage");
      });
  }

  ngOnInit() {
    this.createForm();
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
    this.navCtrl.push("TermsPage");
  }

  goToPrivacy() {
    this.navCtrl.push("PrivacyPage");
  }

  googleLogin() {
    this.authFacade.googleLogin();
  }

  facebookLogin() {
    this.authFacade.facebookLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {});
  }

  twitterLogin() {
    this.authFacade.twitterLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {});
  }
}
