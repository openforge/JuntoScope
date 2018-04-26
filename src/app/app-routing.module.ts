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
import { AuthGuard } from '@app/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren:
      '@app/authentication/authentication.module#AuthenticationModule',
  },
  {
    path: 'dashboard',
    loadChildren: '@app/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'scoping',
    loadChildren: '@app/scoping/scoping.module#ScopingModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'connections',
    loadChildren: '@app/connections/connections.module#ConnectionsModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'projects-dashboard',
    loadChildren: './projects/projects.module#ProjectsModule',
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
