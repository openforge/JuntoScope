import { Injectable } from "@angular/core";
import { Loading, LoadingController } from "ionic-angular";

@Injectable()
export class LoadingService {
  loading: Loading;

  constructor(private loadingCtrl: LoadingController) {}

  // create loading object
  initialize() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        spinner: "crescent",
        cssClass: "custom-loading"
      });
    }
  }

  // hide loading object and create to show again in view
  hide() {
    if (this.loading) {
      this.loading.dismiss().then(() => {
        this.loading = this.loadingCtrl.create({
          spinner: "crescent",
          cssClass: "custom-loading"
        });
      });
    }
  }

  // dismiss loading object completely from view
  dismiss() {
    if (this.loading) {
      this.loading.dismiss().catch(() => {});
    }
  }

  // show loading object in view
  present() {
    if (this.loading) {
      this.loading.present();
    }
  }
}
