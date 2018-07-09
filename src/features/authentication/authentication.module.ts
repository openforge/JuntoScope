import { NgModule, ModuleWithProviders } from "@angular/core";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../../shared/shared.module";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { TermsPage } from "./pages/terms/terms";
import { PrivacyPage } from "./pages/privacy/privacy";
import { authReducer } from "./store/auth.reducer";
import { AuthService } from "./services/auth.service";
import { AuthEffects } from "./store/auth.effects";
import { IonicModule } from "ionic-angular";
import { LoginPage } from "./pages/login/login";

@NgModule({
  imports: [
    IonicModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule
  ],
  declarations: [TermsPage, PrivacyPage],
  entryComponents: [LoginPage]
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [AuthService, AuthEffects]
    };
  }
}
