import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { AuthenticationRoutingModule } from '@app/authentication/authentication-routing.module';
import {
  authReducer,
  initialAuthState,
} from '@app/authentication/state/auth.reducer';
import { AuthService } from '@app/authentication/services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthFacade } from '@app/authentication/state/auth.facade';
import { LoginComponent } from '@app/authentication/containers/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature('auth', authReducer, {
      initialState: initialAuthState,
    }),
    EffectsModule.forFeature([AuthFacade]),
  ],
  declarations: [LoginComponent],
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [AuthService, AuthFacade],
    };
  }
}
