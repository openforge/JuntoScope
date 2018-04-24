import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';

import { CustomSerializer } from './state/router.reducer';
import { RouterFacade } from './state/router.facade';
import { NotFoundComponent } from './not-found.component';
import { UnAuthGuard } from './un-auth.guard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
    canActivate: [UnAuthGuard],
  },
  {
    path: 'scoping',
    loadChildren: './scoping/scoping.module#ScopingModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
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
