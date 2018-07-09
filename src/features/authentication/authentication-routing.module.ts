import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UnAuthGuard } from "../../app/un-auth.guard";
import { LoginPage } from "./pages/login/login";
import { TermsPage } from "./pages/terms/terms";
import { PrivacyPage } from "./pages/privacy/privacy";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/login"
  },
  {
    path: "login",
    component: LoginPage,
    canActivate: [UnAuthGuard]
  },
  {
    path: "terms",
    component: TermsPage
  },
  {
    path: "privacy",
    component: PrivacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UnAuthGuard]
})
export class AuthenticationRoutingModule {}
