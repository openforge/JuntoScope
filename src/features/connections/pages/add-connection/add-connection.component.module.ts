import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SharedModule } from "../../../../shared/shared.module";
import { AddConnectionPage } from "./add-connection.component";

@NgModule({
  declarations: [AddConnectionPage],
  imports: [IonicPageModule.forChild(AddConnectionPage), SharedModule],
  exports: [AddConnectionPage]
})
export class AddConnectionPageModule {}
