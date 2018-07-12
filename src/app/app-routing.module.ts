import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EffectsModule } from "@ngrx/effects";
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from "@ngrx/router-store";

import { CustomSerializer } from "../store/router.reducer";
import { RouterFacade } from "../store/router.facade";
import { NotFoundComponent } from "./not-found.component";
import { AuthGuard } from "./auth.guard";
import { AuthenticationModule } from "../features/authentication/authentication.module";
import { DashboardModule } from "../features/dashboard/dashboard.module";
import { ConnectionsModule } from "../features/connections/connections.module";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => AuthenticationModule
  },
  {
    path: "dashboard",
    loadChildren: () => DashboardModule,
    canActivate: [AuthGuard]
  },
  {
    path: "scoping",
    loadChildren: "@app/scoping/scoping.module#ScopingModule",
    canActivate: [AuthGuard]
  },
  {
    path: "connections",
    loadChildren: () => ConnectionsModule,
    canActivate: [AuthGuard]
  },
  {
    path: "settings",
    loadChildren: "@app/settings/settings.module#SettingsModule",
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EffectsModule.forFeature([RouterFacade]),
    StoreRouterConnectingModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutingModule,
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer
        },
        RouterFacade
      ]
    };
  }
}
