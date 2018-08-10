import { NgModule, ModuleWithProviders } from "@angular/core";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../../shared/shared.module";
import { authReducer } from "./store/auth.reducer";
import { AuthService } from "./services/auth.service";
import { AuthEffects } from "./store/auth.effects";

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([AuthEffects])
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
