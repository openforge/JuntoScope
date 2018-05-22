import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';

import { CustomSerializer } from '@app/state/router.reducer';
import { RouterFacade } from '@app/state/router.facade';
import { NotFoundComponent } from '@app/not-found.component';
import { UnAuthGuard } from '@app/un-auth.guard';
import { AuthGuard } from '@app/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren:
      '@app/authentication/authentication.module#AuthenticationModule',
    canActivate: [UnAuthGuard],
  },
  {
    path: 'scoping',
    loadChildren: '@app/scoping/scoping.module#ScopingModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
    path: 'connections',
    loadChildren: '@app/connections/connections.module#ConnectionsModule',
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
