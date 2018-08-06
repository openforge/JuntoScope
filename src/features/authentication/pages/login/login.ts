import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

import { IonicPage, NavController, NavParams } from "ionic-angular";

import { TakeUntilDestroy, untilDestroyed } from "ngx-take-until-destroy";

import { map, tap, filter, withLatestFrom, take } from "rxjs/operators";

import { AuthEffects } from "../../store/auth.effects";
import { AuthUiState } from "../../store/auth.reducer";
import { AppEffects } from "../../../../store/app.effects";
import { Subscription } from "rxjs";

@TakeUntilDestroy()
@IonicPage({
  segment: "LoginPage",
  priority: "high"
})
@Component({
  selector: "app-login",
  providers: [],
  templateUrl: "./login.html"
})
export class LoginPage implements OnInit, OnDestroy {
  agreeForm: FormGroup;
  userSub: Subscription;
  loginSub: Subscription;
  // loading$ = this.authFacade.uiState$.pipe(
  //   map(uiState => uiState === AuthUiState.LOADING)
  // );

  // authError$ = this.authFacade.error$;
  hasAgreed = false;

  user$ = this.authEffects.user$;

  private loginRedirect$ = this.appEffects.authRedirect$.pipe(
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
    private appEffects: AppEffects,
    private authEffects: AuthEffects,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.loginSub.unsubscribe();
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
    this.authEffects.googleLogin();
    this.loginSub = this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
      this.navCtrl.push(navOptions.path[0]);
    });
  }

  facebookLogin() {
    this.authEffects.facebookLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {});
  }

  twitterLogin() {
    this.authEffects.twitterLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {});
  }
}
