import { NgModule, ModuleWithProviders } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ApiInterceptor } from "./api.interceptor";
import { PopupService } from "./popup.service";
import {
  ObjectKeysPipe,
  ObjectValuesPipe,
  ObjectKeyValuePipe
} from "./pipes/object-iterators.pipe";
import { InfoModalComponent } from "./components/info-modal/info-modal";
import { ShareScopeLinkComponent } from "../features/connections/pages/share-scope-link/share-scope-link.component";
import { ConnectionsModule } from "../features/connections/connections.module";

@NgModule({
  imports: [IonicModule],
  declarations: [
    ObjectKeysPipe,
    ObjectValuesPipe,
    ObjectKeyValuePipe,
    InfoModalComponent
  ],
  entryComponents: [InfoModalComponent],
  exports: [
    ObjectKeysPipe,
    ObjectValuesPipe,
    ObjectKeyValuePipe,
    InfoModalComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptor,
          multi: true
        },
        PopupService
      ]
    };
  }
}
