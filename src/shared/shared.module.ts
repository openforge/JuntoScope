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

@NgModule({
  imports: [IonicModule],
  declarations: [
    // ObjectKeysPipe,
    // ObjectValuesPipe,
    // ObjectKeyValuePipe,
    InfoModalComponent
  ],
  entryComponents: [InfoModalComponent],
  exports: [
    // ObjectKeysPipe,
    // ObjectValuesPipe,
    // ObjectKeyValuePipe,
    InfoModalComponent
  ]
})
export class SharedModule {}
