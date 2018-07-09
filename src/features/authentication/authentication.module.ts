import { NgModule, ModuleWithProviders } from "@angular/core";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../../shared/shared.module";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { LoginPage } from "./pages/login/login";
import { TermsPage } from "./pages/terms/terms";
import { PrivacyPage } from "./pages/privacy/privacy";
import { authReducer, initialAuthState } from "./store/auth.reducer";
import { AuthService } from "./services/auth.service";
import { AuthEffects } from "./store/auth.effects";

@NgModule({
  imports: [
    AuthenticationRoutingModule,
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule
  ],
  declarations: [LoginPage, TermsPage, PrivacyPage]
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [AuthService, AuthEffects]
    };
  }
}
