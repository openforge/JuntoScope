import { Injectable } from "@angular/core";
import { Loading, LoadingController } from "ionic-angular";

@Injectable()
export class LoadingService {
  loading: Loading;
  isLoading = false;

  constructor(private loadingCtrl: LoadingController) {}

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
    if (this.isLoading) {
      this.loading.dismiss().catch(() => {});
      this.isLoading = false;
    }
  }

  // show loading object in view
  present() {
    this.isLoading = true;

    this.loading = this.loadingCtrl.create({
      spinner: "crescent",
      cssClass: "custom-loading"
    });

    if (!this.isLoading) {
      this.loading.present();
    }
  }
}
