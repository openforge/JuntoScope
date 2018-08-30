import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UnAuthGuard } from "../../app/un-auth.guard";
import { LoginPage } from "./pages/login/login.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UnAuthGuard]
})
export class AuthenticationRoutingModule {}
