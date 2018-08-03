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
export class LoginPage implements OnDestroy {
  userSub: Subscription;
  loginSub: Subscription;
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
    private appEffects: AppEffects,
    private authEffects: AuthEffects,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {}

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.loginSub.unsubscribe();
  }

  goToTerms() {
    this.navCtrl.push("TermsPage");
  }

  goToPrivacy() {
    this.navCtrl.push("PrivacyPage");
  }

  googleLogin() {
    this.authEffects.googleLogin();
    // let navOptions;
    this.loginSub = this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
      console.log("navOptions: ", navOptions);
      this.navCtrl.push(navOptions.path[0]);
      // navOptions = navOptions;
    });
  }

  facebookLogin() {
    this.authEffects.facebookLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
      // this.routerFacade.navigate(navOptions);
    });
  }

  twitterLogin() {
    this.authEffects.twitterLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
      // this.routerFacade.navigate(navOptions);
    });
  }
}
