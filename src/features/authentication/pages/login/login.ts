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

import { AuthFacade } from "../../store/auth.facade";
import { AuthUiState } from "../../store/auth.reducer";
import { AppFacade } from "../../../../store/app.facade";

@IonicPage({
  segment: "LoginPage",
  priority: "high"
})
@Component({
  selector: "app-login",
  templateUrl: "./login.html"
})
export class LoginPage implements OnInit, OnDestroy {
  // agreeForm: FormGroup;
  // loading$ = this.authFacade.uiState$.pipe(
  //   map(uiState => uiState === AuthUiState.LOADING)
  // );

  // authError$ = this.authFacade.error$;
  // hasAgreed = false;

  // private loginRedirect$ = this.appFacade.authRedirect$.pipe(
  //   untilDestroyed(this),
  //   filter(redirectUrl => !!redirectUrl),
  //   withLatestFrom(this.routerFacade.queryParams$),
  //   map(([navOptions, query]) => {
  //     if (query && query.returnUrl) {
  //       navOptions.path = [query.returnUrl];
  //     }

  //     return navOptions;
  //   })
  // );

  constructor() // private fb: FormBuilder,
  // private appFacade: AppFacade,
  // private authFacade: AuthFacade,
  {}

  ngOnInit() {
    // this.createForm();
  }

  ngOnDestroy() {}

  // createForm() {
  //   this.agreeForm = this.fb.group({
  //     agree: ['', Validators.required],
  //   });

  //   this.agreeForm.valueChanges.subscribe(data => {
  //     this.hasAgreed = data.agree;
  //   });
  // }

  // googleLogin() {
  //   this.authFacade.googleLogin();

  //   // this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
  //   //   this.routerFacade.navigate(navOptions);
  //   // });
  // }

  // facebookLogin() {
  //   this.authFacade.facebookLogin();

  //   // this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
  //   //   this.routerFacade.navigate(navOptions);
  //   // });
  // }

  // twitterLogin() {
  //   this.authFacade.twitterLogin();

  //   // this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
  //   //   this.routerFacade.navigate(navOptions);
  //   // });
  // }
}
