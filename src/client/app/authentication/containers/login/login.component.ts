import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, tap, filter, withLatestFrom, take } from 'rxjs/operators';

import { AuthFacade } from '@app/authentication/state/auth.facade';
import { AuthUiState } from '@app/authentication/state/auth.reducer';
import { RouterFacade } from '@app/state/router.facade';
import { AppFacade } from '@app/state/app.facade';

@TakeUntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  agreeForm: FormGroup;
  loading$ = this.authFacade.uiState$.pipe(
    map(uiState => uiState === AuthUiState.LOADING)
  );

  authError$ = this.authFacade.error$;
  hasAgreed = false;

  private loginRedirect$ = this.appFacade.authRedirect$.pipe(
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
    private appFacade: AppFacade,
    private authFacade: AuthFacade,
    private routerFacade: RouterFacade
  ) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {}

  createForm() {
    this.agreeForm = this.fb.group({
      agree: ['', Validators.required],
    });

    this.agreeForm.valueChanges.subscribe(data => {
      this.hasAgreed = data.agree;
    });
  }

  googleLogin() {
    this.authFacade.googleLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
      this.routerFacade.navigate(navOptions);
    });
  }

  facebookLogin() {
    this.authFacade.facebookLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(navOptions => {
      this.routerFacade.navigate(navOptions);
    });
  }
}
