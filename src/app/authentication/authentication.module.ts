import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { AuthenticationRoutingModule } from '@app/authentication/authentication-routing.module';
import { LoginComponent } from '@app/authentication/containers/login/login.component';
import { TermsComponent } from '@app/authentication/containers/terms/terms.component';
import { PrivacyComponent } from '@app/authentication/containers/privacy/privacy.component';
import {
  authReducer,
  initialAuthState,
} from '@app/authentication/state/auth.reducer';
import { AuthService } from '@app/authentication/services/auth.service';
import { AuthFacade } from '@app/authentication/state/auth.facade';

@NgModule({
  imports: [
    AuthenticationRoutingModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthFacade]),
    SharedModule,
  ],
  declarations: [LoginComponent, TermsComponent, PrivacyComponent],
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [AuthService, AuthFacade],
    };
  }
}
