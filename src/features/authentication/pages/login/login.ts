import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { untilDestroyed } from "ngx-take-until-destroy";
import { map, filter, take } from "rxjs/operators";
import { Subscription } from "rxjs";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { AppFacade } from "../../../../store/app.facade";
import { AppState} from "../../../../store/app.reducer";
import { AuthFacade } from "../../store/auth.facade";
import { AuthActionTypes, ClearErrorAction } from "../../store/auth.actions";
import { PopupService } from "../../../../shared/popup.service";
import { LoadingService } from "../../../../shared/loading.service";


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
  
  authError$ = this.authFacade.error$;

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
    private store: Store<AppState>,
    private fb: FormBuilder,
    private appFacade: AppFacade,
    private authFacade: AuthFacade,
    private navCtrl: NavController,
    private navParams: NavParams,
    private actions$: Actions,
    private popupSvc: PopupService,
    private loadingSrv: LoadingService
  ) {
    this.redirectSubs = this.actions$
      .ofType(AuthActionTypes.AUTHENTICATED)
      .subscribe(() => {
        console.log('dismissing!');
        this.loadingSrv.dismiss();
        this.redirectSubs.unsubscribe();
        this.navCtrl.setRoot("DashboardPage");
      });

      this.authError$.subscribe(error => {
        if (error) {
          this.loadingSrv.hide();
          this.popupSvc.simpleAlert("Uh Oh!", error, "OK");
          this.store.dispatch(new ClearErrorAction());
        }
      });
  }

  ngOnInit() {
    this.createForm();
    this.loadingSrv.initialize();
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
