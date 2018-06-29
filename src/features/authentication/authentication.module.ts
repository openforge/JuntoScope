import { NgModule, ModuleWithProviders } from "@angular/core";
import { IonicModule } from "ionic-angular";

import { SharedModule } from "../../shared/shared.module";

import { AuthService } from "./services/auth.service";
import { AppFacade } from "../../store/app.facade";

@NgModule({
  imports: [IonicModule, SharedModule],
  declarations: [],
  exports: [],
  entryComponents: [],
  providers: [AuthService]
})
export class AuthenticationModule {}
