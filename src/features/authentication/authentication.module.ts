import { NgModule, ModuleWithProviders } from "@angular/core";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../../shared/shared.module";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { authReducer } from "./store/auth.reducer";
import { AuthService } from "./services/auth.service";
import { AuthEffects } from "./store/auth.effects";
import { IonicModule } from "ionic-angular";
import { TermsPageModule } from "./pages/terms/terms.module";
import { PrivacyPageModule } from "./pages/privacy/privacy.module";
import { LoginPageModule } from "./pages/login/login.module";

@NgModule({
  imports: [
    IonicModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule,
    TermsPageModule,
    PrivacyPageModule,
    LoginPageModule
  ],
  declarations: [],
  entryComponents: []
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [AuthService, AuthEffects]
    };
  }
}
