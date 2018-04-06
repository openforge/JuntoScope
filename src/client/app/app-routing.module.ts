import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';

import { CustomSerializer } from './state/router.reducer';
import { RouterFacade } from './state/router.facade';

const routes: Routes = [
  {
    path: '',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([RouterFacade]),
    StoreRouterConnectingModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutingModule,
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer,
        },
        RouterFacade,
      ],
    };
  }
}
