import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

import { IonicPage, NavController } from "ionic-angular";

import { TakeUntilDestroy, untilDestroyed } from "ngx-take-until-destroy";

import { map, tap, filter, withLatestFrom, take } from "rxjs/operators";

import { AuthEffects } from "../../store/auth.effects";
import { AuthUiState } from "../../store/auth.reducer";
import { AppEffects } from "../../../../store/app.effects";
import { RouterFacade } from "../../../../store/router.facade";

@IonicPage({
  segment: "LoginPage",
  priority: "high"
})
@Component({
  selector: "app-login",
  providers: [RouterFacade],
  templateUrl: "./login.html"
})
export class LoginPage implements OnInit, OnDestroy {
  agreeForm: FormGroup;
  // loading$ = this.authFacade.uiState$.pipe(
  //   map(uiState => uiState === AuthUiState.LOADING)
  // );

  // authError$ = this.authFacade.error$;
  hasAgreed = false;

  private loginRedirect$ = this.appEffects.authRedirect$.pipe(
    untilDestroyed(this),
    filter(redirectUrl => !!redirectUrl),
    withLatestFrom(this.routerFacade.queryParams$),
    map(([navOptions, query]) => {
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
    private routerFacade: RouterFacade
  ) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {}

  createForm() {
    this.agreeForm = this.fb.group({
      agree: ["", Validators.required]
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

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
      this.routerFacade.navigate(navOptions);
    });
  }

  facebookLogin() {
    this.authEffects.facebookLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
      this.routerFacade.navigate(navOptions);
    });
  }

  twitterLogin() {
    this.authEffects.twitterLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
      this.routerFacade.navigate(navOptions);
    });
  }
}
