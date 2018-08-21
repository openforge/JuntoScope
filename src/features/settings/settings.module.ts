import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { SettingsService } from "./service/settings.service";
import { ModuleWithProviders } from "@angular/compiler/src/core";

@NgModule({
  imports: [SharedModule],
  declarations: [],
  exports: [],
  entryComponents: [],
  providers: []
})
export class SettingsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SettingsModule,
      providers: [SettingsService]
    };
  }
}
