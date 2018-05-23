import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnAuthGuard } from '@app/un-auth.guard';
import { LoginComponent } from '@app/authentication/containers/login/login.component';
import { TermsComponent } from '@app/authentication/containers/terms/terms.component';
import { PrivacyComponent } from '@app/authentication/containers/privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnAuthGuard],
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
