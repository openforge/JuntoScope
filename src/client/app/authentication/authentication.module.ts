import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { authReducer, initialAuthState } from './state/auth.reducer';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthFacade } from './state/auth.facade';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature('auth', authReducer, {
      initialState: initialAuthState,
    }),
    EffectsModule.forFeature([AuthFacade]),
  ],
  declarations: [],
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [AuthService, AuthFacade],
    };
  }
}
